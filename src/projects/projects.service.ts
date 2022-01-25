import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contribution } from './contribution.schema';
import { ApprovedUnapporvedProjectsInput } from './dto/approveUnapprovedProjects.input';
import { CreateProjectInput } from './dto/create-project.input';
import { CreateContributionInput } from './dto/createContribution.input';
import { FindProjectInput } from './dto/find-project.input';
import { FindUserProjectsInput } from './dto/find-users-projects.input';
import { Project } from './project.schema';

@Injectable()
export class ProjectsService {

  constructor(@InjectModel(Project.name) private projectModel :Model<Project>,
  @InjectModel(Contribution.name) private contributionModel :Model<Contribution>){}

  //function to create project.
  async create(createProjectInput: CreateProjectInput) {
    try{
      const project = new this.projectModel(createProjectInput);
      const createdProject = project.save();
      let ApiResponse = {
        code : 200,
        message : "Project is created sucessfully",
        data : createdProject
      }
      return ApiResponse;
    }
    catch(error)
    {
      let ApiResponse = {
        code : 204,
        message : error
      }
      return ApiResponse;
    }
  }

  async findAll() {
    try{
      const projects =  await this.projectModel.find();
      let ApiResponse = {
        code : 200,
        message : "Projects are as follows",
        data : projects
    }
    return ApiResponse;
    }
    catch(error)
    {
      let ApiResponse = {
        code : 204,
        message : error
    }
    return ApiResponse;
    }
   
}

  //function to find user projects.
  async findUserProject(findUserProjects : FindUserProjectsInput)
  {
    try{
      const projects = await this.projectModel.find({createdBy : findUserProjects._id});
      let ApiResponse = {
        code : 200,
        message : "User created projects are as follows",
        data : projects
      }
    return ApiResponse;
    }
    catch(error)
    {
      let ApiResponse = {
        code : 200,
        message : error
      }
    return ApiResponse;
    }
  }

  //function to calculate user total contributions.
  async findContributions(findUser : FindUserProjectsInput)
  {
  
    try{
      const project = await this.contributionModel.find({contributorId : findUser});
    var sum = 0;

    if(project.length === 0)
    {
      let apiResponse = {
        code : 404,
        message : "no documents found for this id :",
        data : sum
      }
      return apiResponse;
    }

      
      sum = project.map(item => item.contribution).reduce((prev, next) => prev + next);

    let apiResponse = {
      code : 200,
      message : "sucessfully calculated your total contributions : ",
      data : sum
    }

    return apiResponse;
    
    }
    catch(error)
    {
      let apiResponse = {
        code : 204,
        message : error,
        data : sum
      }
      return apiResponse;
    }
  }

  //function to add project contribution.
  async addProjectContribution(createContributionInput : CreateContributionInput)
  {
      const project = await this.projectModel.findById({_id : createContributionInput.projectId});

      if(!project)
      {
        let ApiResponse = {
          code : 404,
          message : "No project found for such an id"
        }

        return ApiResponse;
      }

      const project_amount = project.projectAmount;
      var contributionSum = 0;
      

      const projectContributions = await this.contributionModel.find({projectId : createContributionInput.projectId}) ;
      for(let i = 0 ; i< projectContributions.length ; i++)
      {
        contributionSum = contributionSum + projectContributions[i].contribution;
      }

      var contributionDifference = project_amount - contributionSum;

      if(project.createdBy == createContributionInput.contributorId)
      {
        let ApiResponse = {
          code : 204,
          message : "Project creator is not allowed to contribute"
        }

        return ApiResponse;
      }

      else if(project.endingDate < new Date())
      {
        let ApiResponse = {
          code : 204,
          message : "Project has exceeded it's ending date"
        }

        return ApiResponse;
      }

      else if (createContributionInput.contribution > project_amount)
      {
        let ApiResponse = {
          code : 204,
          message : `Your contribution is more than the project total amount ${project_amount}`
        }

        return ApiResponse;
      }

      else if (createContributionInput.contribution + contributionSum > project_amount)
      {
        let ApiResponse = {
          code : 204,
          message : `Remaining contribution is ${contributionDifference}. Please contribute within this limit`
        }

        return ApiResponse;
      }

      else
      {
        const contribution =  new this.contributionModel(createContributionInput);
        const sucessfullContribution = await contribution.save();
        let ApiResponse = {
          code : 200,
          message : "Contribution is added successfully",
          data : sucessfullContribution
        }

        return ApiResponse;
      }
  }

  //function to calculate projoect contributions percentage.
  async findContributionPercentage(findProject : FindProjectInput)
  {
      const project = await this.projectModel.findById({_id : findProject._id});

      if(!project)
      {
        let ApiResponse = {
          code : 404,
          message : "No project found for such an id"
        }

        return ApiResponse;
      }

      const projectAmountt = project.projectAmount;

      const contributions = await this.contributionModel.find({projectId : findProject._id});
      var sum = 0;

      sum = contributions.map(item => item.contribution).reduce((prev, next) => prev + next);

      var percentage = (sum / projectAmountt) * 100 ;

      let ApiResponse = {
        code : 200,
        message : "Percentage is contributed sucessfully ",
        data : `${percentage} Percent`
      }

      return ApiResponse;
  }

  //function to find list of approved or unapproved projects by choice.
  async findPorjectsByChoice( choiceInput : ApprovedUnapporvedProjectsInput)
  {
    const Projects = await this.projectModel.find()

    try{
      if(choiceInput.choice === "approved")
      {
        var approvedProjects = Projects.filter(function(obj) {
          return obj.approved == true;
        });

        let ApiResponse = {
           code : 200,
           message : "Approved projects are as follows",
           data : approvedProjects
         }

        return ApiResponse;
      }
      else if(choiceInput.choice === "unapproved")
      {
        var unApprovedProjects = Projects.filter(function(obj) {
          return obj.approved == false;
        });

        let ApiResponse = {
          code : 200,
          message : "Unapproved projects are as follows",
          data : unApprovedProjects
        }

        return ApiResponse;
      }
      else {
        let ApiResponse = {
          code : 204,
          message : "Bad Request. Please enter approved or unapproved"
        }

        return ApiResponse;
      }
    }
    catch(error)
    {
      let ApiResponse = {
        code : 204,
        message : error
      }

      return ApiResponse;
    }
  }

  //function to find projects that are started and amount greater than 5000.
  async findStartedAmountProjects()
  {
    try{
      const currentDate = new Date().setUTCHours(0,0,0,0);

      const projects = await this.projectModel.find({
      $or : [
        {projectAmount : { $gt : 5000 }},
        {startingDate : { $lt : currentDate }},
        {createdAt : {$eq : currentDate }}
      ]})

      if(!projects)
      {
        let ApiResponse = {
          code : 404,
          message : "No such projects found"
        }
  
        return ApiResponse;
      }
      else{
        let ApiResponse = {
          code : 200,
          message : "Projects are as follows",
          data : projects
        }
  
        return ApiResponse;
      }
    }
    catch(error)
    {
      
      let ApiResponse = {
        code :  204,
        message : error
      }

      return ApiResponse;
    }
  }

}
