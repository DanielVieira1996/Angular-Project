import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainPageComponent } from './allPages/main-page/main-page.component';
import { inject } from '@angular/core';
import { authGuardGuard, loginAccess } from './guards/auth-guard.guard';
import { AllContentComponent } from './content/all-content/all-content.component';
import { ContentCardComponent } from './content/content-card/content-card.component';


export const routes: Routes = [
    {
        path:'', 
        redirectTo:'main',
        pathMatch:'prefix'
       },
    {
        path:'login',
        component: LoginComponent,
        canActivate: [loginAccess]
    },    
    {
        path:'main',
        component:MainPageComponent,
        //canActivate: [authGuardGuard],
        children:[

            {
                path: '',
                redirectTo: 'content', // Redirect to the first child route
                pathMatch: 'full'

            },
            {
                path:'content',
                component:ContentCardComponent,
                // To be dynamically, totalPage will be the number os articles displayed for each page
                data:{totalPage:7}
                
            },
            {
                path:'content/:contentId',
                component:AllContentComponent
            }
        
        
        ]
    },
    
];
