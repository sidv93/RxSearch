import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchForm: any;
  public results$: Observable<any>;

  public constructor(private fb: FormBuilder, private http: Http) {
    this.searchForm= this.fb.group({
      'search': ['', Validators.required]
    });
    this.results$= this.searchForm.controls.search.valueChanges
      .debounceTime(500)
      .switchMap(query => {
        console.log("value="+ query);
        return this.http.get('http://localhost:3000/api/getAllUsers');
      })
      .map(res => res.json().data);
  }
}
