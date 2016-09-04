import { StorageService } from './storage.service';
import { ConfigurationService } from './configuration.service';
import { RecentProjectsService } from './recent-projects.service';
import { GithubService } from './github.service';
import { AuthService } from './auth.service';
import { QuestionService } from './question.service';
import { CommentService } from './comment.service';
import { LabelService } from './label.service';
import { MaterializeService } from './materialize.service';
import { SearchQueryBuilderService } from './searchquerybuilder.service';

export const APP_SERVICES = [
  StorageService,
  ConfigurationService,
  RecentProjectsService,
  GithubService,
  AuthService,
  QuestionService,
  CommentService,
  LabelService,
  MaterializeService,
  SearchQueryBuilderService
];
