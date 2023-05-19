import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  http = inject(HttpClient);
  api = environment.api + 'action';
  user_id = sessionStorage.getItem('site_user_storge_name');

  actions: Array<any> = [];
  action: Array<any> = [];
  searchText: string = '';

  load() {
    this.http.get(this.api + '?user_id=' + this.user_id).subscribe((res: any) => this.actions = res);
  }


  ngOnInit(): void {
    this.load();
  }


  onSearch(text: string) {
    if (text.length > 3)
      this.searchText = text;
    else
      this.searchText = '';
  }


  showAction(id: number) {
    this.actions.forEach((item: any) => {
      if(item.id == id)
        this.action = [item];
    });
  }

}
