import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.scss']
})
export class ActionEditComponent {
  http = inject(HttpClient);
  router = inject(Router);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  user_id = sessionStorage.getItem('site_user_storge_name');
  id = this.route.snapshot.paramMap.get('id');
  api = environment.api;


  services: Array<any> = [];

  // action propertys
  addForm: any = this.fb.group({
    id: 0,
    name: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    travel_type_id: [0, Validators.required],
    person_count: ['', Validators.required],
    duration: ['', [Validators.required, Validators.minLength(3)]],
    items: this.fb.array([])
  });


  newList(): FormGroup {
    return this.fb.group({
      action_id: this.id,
      service_id: 0,
      comment: ['', Validators.required],
      price: ['']
    });
  }


  get formItem(): FormArray {
    return this.addForm.get('items') as FormArray | any;
  }


  newFormFunction() {
    this.formItem.push(this.newList());
  }


  load() {
    // get services
    this.http.get(this.api + 'service?user_id=' + this.user_id).subscribe((res: any) => this.services = res);

    if (this.id != '0')
      this.http.get(this.api + 'action/' + this.id).subscribe((res: any) => {
        if (res.legth != 0) {
          this.addForm.patchValue({
            id: res[0]['id'],
            name: res[0]['name'],
            phone: res[0]['phone'],
            address: res[0]['address'],
            travel_type_id: res[0]['travel_type_id'],
            person_count: res[0]['person_count'],
            duration: res[0]['duration'],
            items: []
          });

          res[0]['items'].forEach((item: any) => {
            this.formItem.push(this.fb.group(item));
          });
        } else
          this.router.navigateByUrl("/admin/dashboard");
      });
    else
      this.router.navigateByUrl("/admin/dashboard");
  }


  update() {

    let action = {
      id: this.addForm.value.id,
      name: this.addForm.value.name,
      phone: this.addForm.value.phone,
      address: this.addForm.value.address,
      travel_type_id: this.addForm.value.travel_type_id,
      person_count: this.addForm.value.person_count,
      duration: this.addForm.value.duration,
    };

    this.http.patch(this.api + 'action/' + this.id, action).subscribe();

    let action_edit_item: Array<any> = [];
    let action_new_item: Array<any> = [];

    this.addForm.value.items.forEach((item: any) => {
      if (item.id == undefined)
        action_new_item.push(item);
      else
        action_edit_item.push(item);
    });

    if (action_edit_item.length > 0)
      this.http.patch(this.api + 'action-item', action_edit_item).subscribe();

    if (action_new_item.length > 0)
      this.http.post(this.api + 'action-item?user_id=' + this.user_id, action_new_item).subscribe();

    this.router.navigateByUrl("/admin/dashboard");
  }



  deleteLesson(id: number) {
    let action_item_id = this.formItem.value[id]['id'];
    if (action_item_id != undefined) {
      this.http
        .delete(this.api + 'action-item/' + action_item_id)
        .subscribe(() => this.router.navigateByUrl(`/admin/action/${this.id}`));
    }

    this.formItem.removeAt(id);
  }


  ngOnInit(): void {
    this.load();
  }
}
