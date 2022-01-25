import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, projectSchema } from './project.schema';
import { Contribution, ContributionSchema } from './contribution.schema';

@Module({
  imports : [MongooseModule.forFeature([
    {
      name : Project.name , schema : projectSchema
    },
    {
      name : Contribution.name , schema : ContributionSchema
    }
  ])],
  providers: [ProjectsResolver, ProjectsService]
})
export class ProjectsModule {}
