import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShorteningPageComponent } from "./components/shortening-page/shortening-page.component";
import { UrlDetailsComponent } from "./components/url-details/url-details.component";

const routes: Routes = [
  { path: "", component: WelcomePageComponent },
  {
    path: "shortener",
    component: ShorteningPageComponent,
    children: [
      {
        path: ":id",
        component: UrlDetailsComponent
      }
    ]
  }
  // { path: "shortener/:id", component: UrlDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
