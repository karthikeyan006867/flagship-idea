import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { DecisionsModule } from './modules/decisions/decisions.module';
import { OutcomesModule } from './modules/outcomes/outcomes.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      cors: {
        origin: [
          'http://localhost:3000',
          'https://hdip-platform.vercel.app',
          'https://hdip-platform-hvpkcp8e7-karthikeyan006867s-projects.vercel.app'
        ],
        credentials: true,
      },
    }),
    DecisionsModule,
    OutcomesModule,
    UsersModule,
    AuthModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
