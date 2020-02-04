import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'matchscouting',
    loadChildren: './matchscouting/matchscouting.module#MatchscoutingPageModule'
  },
  {
    path: 'configuration',
    loadChildren: './configuration/configuration.module#ConfigurationPageModule'
  },
  {
    path: 'scoutmanager',
    loadChildren: './scoutmanager/scoutmanager.module#ScoutmanagerPageModule'
  },
  {
    path: 'teammanager',
    loadChildren: './teammanager/teammanager.module#TeammanagerPageModule'
  },
  {
    path: 'matchlist',
    loadChildren: './matchlist/matchlist.module#MatchlistPageModule'
  },
  { path: 'matchedit/:matchid', 
    loadChildren: './matchedit/matchedit.module#MatcheditPageModule' 
  },
  { path: 'matchadd/:matchno',
    loadChildren: './matchadd/matchadd.module#MatchaddPageModule' 
  },
  { path: 'scoutadd', 
    loadChildren: './scoutadd/scoutadd.module#ScoutaddPageModule' 
  },
  { path: 'scoutedit/:scoutid',
    loadChildren: './scoutedit/scoutedit.module#ScouteditPageModule' 
  },
  { path: 'scoutmonitor',
    loadChildren: './scoutmonitor/scoutmonitor.module#ScoutmonitorPageModule' },
  {
     path: 'eventlist',
    loadChildren: () => import('./eventlist/eventlist.module').then( m => m.EventlistPageModule)
  },
  {
    path: 'eventadd',
    loadChildren: () => import('./eventadd/eventadd.module').then( m => m.EventaddPageModule)
  },
  {
    path: 'eventedit/:eventid',
    loadChildren: () => import('./eventedit/eventedit.module').then( m => m.EventeditPageModule)
  },
  {
    path: 'seasonlist',
    loadChildren: () => import('./seasonlist/seasonlist.module').then( m => m.SeasonlistPageModule)
  },
  {
    path: 'seasonadd',
    loadChildren: () => import('./seasonadd/seasonadd.module').then( m => m.SeasonaddPageModule)
  },
  {
    path: 'seasonedit/:seasonyear',
    loadChildren: () => import('./seasonedit/seasonedit.module').then( m => m.SeasoneditPageModule)
  },
  {
    path: 'seasonadd',
    loadChildren: () => import('./seasonadd/seasonadd.module').then( m => m.SeasonaddPageModule)
  },
  {
    path: 'seasonlist',
    loadChildren: () => import('./seasonlist/seasonlist.module').then( m => m.SeasonlistPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
