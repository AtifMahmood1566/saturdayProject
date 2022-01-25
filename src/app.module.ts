import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { User, UserSchema } from './users/user.shcema';
import { ProjectsModule } from './projects/projects.module';
import { Project, projectSchema } from './projects/project.schema';
import { Contribution, ContributionSchema } from './projects/contribution.schema';

@Module({
  imports: [UsersModule , GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground : true,
    introspection : true,
  }),
    MongooseModule.forRoot('mongodb+srv://atif:dbUserPassword@cluster0.x15aw.mongodb.net/newNgm?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    },
  {
    name : Project.name , schema : projectSchema
  },
{
  name : Contribution.name , schema : ContributionSchema
}]),
    ProjectsModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
