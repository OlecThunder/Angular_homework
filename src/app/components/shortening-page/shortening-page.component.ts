import { StorageService } from "./../../services/storage.service";
import { Shortening } from "./../../models/shortening-response.interface";
import { ShortenerApiService } from "./../../services/shortener-api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shortening-page",
  templateUrl: "./shortening-page.component.html",
  styleUrls: ["./shortening-page.component.css"]
})
export class ShorteningPageComponent implements OnInit {
  url = "";
  name = "";
  filter = "";
  displayArr = [];
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService
  ) {
    this.updateShortenings();
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.url) {
      return;
    }
    let syncName = this.name;
    this.shortAPI.shortenUrl(this.url).subscribe(response => {
      response.result.myName = syncName;
      this.storageService.saveShortenings(response.result);
      this.updateShortenings();
    });
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings();
  }

  onDelete(idItem) {
    if (confirm("Your sure, you want to delete this item ?")) {
      this.storageService.deleteItem(idItem);
      this.updateShortenings();
    }
  }

  onFilterInput() {
    let re = new RegExp(`${this.filter}`, "i");
    this.displayArr = this.shortenings.filter(item => re.test(item.myName));
    console.log(this.displayArr);
  }
}
