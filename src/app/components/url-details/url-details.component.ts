import { Shortening } from "./../../models/shortening-response.interface";
import { StorageService } from "./../../services/storage.service";
import { Component, OnInit, Output } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  Params,
  NavigationExtras
} from "@angular/router";

@Component({
  selector: "app-url-details",
  templateUrl: "./url-details.component.html",
  styleUrls: ["./url-details.component.css"]
})
export class UrlDetailsComponent implements OnInit {
  id: number;
  shortening: Shortening;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.shortening = this.storageService.getSingleShortening(this.id);
    console.log(this.shortening);
  }

  onClick() {
    if (confirm("Your sure, you want to delete this item ?")) {
      this.storageService.deleteItem(this.id);
      this.router.navigateByUrl("/shortener");
    }
  }

  onBack() {
    this.router.navigateByUrl("/shortener");
  }

  ngOnInit() {}
}
