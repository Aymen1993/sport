import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CupEventComponent } from './components/cup-event/cup-event.component';
import { ResultComponent } from './components/result/result.component';
import { NewsComponent } from './components/news/news.component';
import { StartsComponent } from './components/starts/starts.component';
import { BlogComponent } from './components/blog/blog.component';
import { InfoComponent } from './components/info/info.component';
import { ArticleComponent } from './components/article/article.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddPalyerComponent } from './components/add-palyer/add-palyer.component';
import { BannerComponent } from './components/banner/banner.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/player/player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { MatchesTableComponent } from './components/matches-table/matches-table.component';
import { TeamsTableComponent } from './components/teams-table/teams-table.component';
import { PlayersTableComponent } from './components/players-table/players-table.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { StadiumTableComponent } from './components/stadium-table/stadium-table.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { TeamComponent } from './components/team/team.component';
import { AsterixPipe } from './pipes/asterix.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HttpClientModule} from "@angular/common/http";
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { WeatherComponent } from './components/weather/weather.component';
import { ApiTeamsComponent } from './components/api-teams/api-teams.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CupEventComponent,
    ResultComponent,
    NewsComponent,
    StartsComponent,
    BlogComponent,
    InfoComponent,
    ArticleComponent,
    AddMatchComponent,
    AddTeamComponent,
    AddPalyerComponent,
    BannerComponent,
    MatchesComponent,
    PlayersComponent,
    PlayerComponent,
    AdminComponent,
    MatchesTableComponent,
    TeamsTableComponent,
    PlayersTableComponent,
    AddCountryComponent,
    AddStadiumComponent,
    StadiumTableComponent,
    MatchInfoComponent,
    PlayerInfoComponent,
    TeamInfoComponent,
    TeamComponent,
    AsterixPipe,
    GenderPipe,
    UsersTableComponent,
    ReversePipe,
    SearchMatchesComponent,
    MyFilterPipe,
    WeatherComponent,
    ApiTeamsComponent,
    InscriptionComponent,
    ConnexionComponent,
    ListUsersComponent,
    EditClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
