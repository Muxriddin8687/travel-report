import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api + 'action';
  user_id = sessionStorage.getItem('site_user_storge_name');

  actions: Array<any> = [];
  action: Array<any> = [];
  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    travel_type_id: [0, Validators.required],
    person_count: ['', Validators.required],
    duration: ['', [Validators.required, Validators.minLength(3)]],
    user_id: [this.user_id],
  });

  load() {
    this.http.get(this.api + '/dashboard?user_id=' + this.user_id).subscribe((res: any) => this.actions = res);
  }

  ngOnInit(): void {
    this.load();
  }


  addAction() {
    if (this.addForm.value.travel_type_id != 0)
      this.http
        .post(this.api + '?user_id=' + this.user_id, this.addForm.value)
        .subscribe((res) => {
          this.addForm.reset();
          this.load();
        });
  }

  delete(id: number) {
    this.http.delete(this.api + '/' + id).subscribe((res) => {
      this.load();
    });
  }


  done(id: number) {
    this.http.get(this.api + '/done/' + id).subscribe((res) => {
      this.load();
    });
  }

  showAction(id: number) {
    this.actions.forEach((item: any) => {
      if(item.id == id)
        this.action = [item];
    });
  }

}
