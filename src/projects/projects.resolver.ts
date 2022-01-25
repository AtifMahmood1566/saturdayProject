import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './dto/create-project.input';
import { CreateContributionInput } from './dto/createContribution.input';
import { FindUserProjectsInput } from './dto/find-users-projects.input';
import { CalculateContributionApiResponseDto } from './dto/user-contribution-response.dto';
import { AddContributionApiResponseDto } from './dto/contribution-response.dto';
import { ContributionPercentageApiResponseDto } from './dto/contributionPercenageApiResponse.dto';
import { FindProjectInput } from './dto/find-project.input';
import { CreateProjectApiResponseDto } from './dto/createProjectApiResponse.dto';
import { FindProjectsApiResponseDto } from './dto/findProjectsApiResponse.dto';
import { FindUserProjectsApiResponseDto } from './dto/findUsersProjectsApiResponse.dto';
import { ApprovedUnapprovedProjectsApiResponseDto } from './dto/approvedUnapprovedProjectsApiResponse.dto';
import { ApprovedUnapporvedProjectsInput } from './dto/approveUnapprovedProjects.input';
import { ProjectsApiResponseDto } from './dto/ProjectsApiResponse.dto';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => CreateProjectApiResponseDto)
  createProject(@Args('input') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => FindProjectsApiResponseDto)
  findProjects()
  {
    return this.projectsService.findAll();
  }

  //Query to return list of projects created by a specific user.
  @Query(() => FindUserProjectsApiResponseDto)
  async findUserProjects(@Args('input') findUserProjects : FindUserProjectsInput)
  {
    return await this.projectsService.findUserProject(findUserProjects);
  }

  //Mutation to find contribution of a specific user.
  @Mutation(() => CalculateContributionApiResponseDto)
  async findUserContributionsTillNow(@Args('input') findUser : FindUserProjectsInput)
  {
    return await this.projectsService.findContributions(findUser);
  } 

  //Mutation to add contribution.
  @Mutation(() => AddContributionApiResponseDto)
  async addContribution(@Args('input')  createContributionInput : CreateContributionInput)
  {
    return await this.projectsService.addProjectContribution(createContributionInput);
  }

  //Mutation to find percentage of project contribution.
  @Mutation(() => ContributionPercentageApiResponseDto)
  async findPercentage(@Args('input') findProject : FindProjectInput)
  {
    return await this.projectsService.findContributionPercentage(findProject);
  }

  //Query to find approved or unapproved projects.
  @Query(() => ApprovedUnapprovedProjectsApiResponseDto)
  async findApprovedUnapprovedProjects(@Args('input') choiceInput : ApprovedUnapporvedProjectsInput)
  {
    return await this.projectsService.findPorjectsByChoice(choiceInput);
  }

  //Query to find projects which are started and amount is greater than 5000.
  @Query(() => ProjectsApiResponseDto)
  async findStartedAndGreaterAmount()
  {
    return await this.projectsService.findStartedAmountProjects();
  } 
  
}
