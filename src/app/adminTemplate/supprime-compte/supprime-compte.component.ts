import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supprime-compte',
  templateUrl: './supprime-compte.component.html',
  styleUrls: ['./supprime-compte.component.css']
})
export class SupprimeCompteComponent implements OnInit {
public id;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
  }

}
