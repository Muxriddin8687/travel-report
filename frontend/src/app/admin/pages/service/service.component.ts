import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {

  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api + 'service';
  user_id = sessionStorage.getItem('site_user_storge_name');

  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    user_id: [this.user_id]
  });

  services: any;
  id: number = 0;
  showError: boolean = false;


  load () {
    this.http.get(this.api + '?user_id=' + this.user_id).subscribe(res => this.services = res);
  }

  ngOnInit(): void {
    this.load();
  }


  edit(id: number) {
    this.id = id;
    this.services.forEach((item: any) => {
      if(item.id == id) {
        this.addForm.patchValue({
          name: item.name,
        });
      }
    });
  }


  update() {
    this.http.patch(this.api + '/' + this.id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }


  delete(id: number) {
    this.http.delete(this.api + '/' + id).subscribe(
      (res) => this.load(),
      (err) => { this.showError = true; setTimeout(() => this.showError = false, 5000)}
    );
  }


  add() {
    this.http.post(this.api + '?user_id=' + this.user_id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }
}
