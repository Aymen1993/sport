import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ApiTeamsComponent } from './components/api-teams/api-teams.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPalyerComponent } from './components/add-palyer/add-palyer.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  //http://localhost:4200/connexion =>afficher login component
  {path:"connexion",component:LoginComponent},
  //http://localhost:4200/subscription =>afficher signup component
  {path:"subscription",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"editUser/:id",component:SignupComponent},

  {path:"addMatch",component:AddMatchComponent},
  {path:"editMatch/:x",component:AddMatchComponent},
  {path:"addTeam",component:AddTeamComponent},
  {path:"editTeam/:x",component:AddTeamComponent},
  {path:"addPlayer",component:AddPalyerComponent},
  {path:"editPlayer/:x",component:AddPalyerComponent},
  {path:"matches",component:MatchesComponent},
  {path:"admin",component:AdminComponent},
  {path:"players",component:PlayersComponent},
  {path:"country",component:AddCountryComponent},
  {path:"addStadium",component:AddStadiumComponent},
  {path:"editStadium/:x",component:AddStadiumComponent},
  {path:"matchInfo/:x",component:MatchInfoComponent},
  {path:"teamInfo/:x",component:TeamInfoComponent},
  {path:"playerInfo/:x",component:PlayerInfoComponent},
  {path:"searchMatches",component:SearchMatchesComponent},
  {path:"searchWeather",component:WeatherComponent},
  {path:"apiTeams",component:ApiTeamsComponent},
  {path:"inscription",component:InscriptionComponent},
  {path:"login",component:ConnexionComponent},
  {path:"listUsers",component:ListUsersComponent},
  {path:"editClient/:id",component:EditClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
