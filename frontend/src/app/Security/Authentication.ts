import { CanActivate, Router } from "@angular/router";
import { RoleBaseService } from "./RoleBase.service";
import { Injectable } from "@angular/core";
@Injectable(
    {
        providedIn: 'root'
    }
)

export class CustomAuthentication implements CanActivate
{
    constructor(private myRouter: Router, private rolebase: RoleBaseService)
    {

    }
    canActivate(): boolean 
    {
    
        if(this.rolebase.isloggedIn())
        {
            return true;
        }
        else
        {
            this.myRouter.navigate(['Log-in']);
            return false;
        }
    }

}