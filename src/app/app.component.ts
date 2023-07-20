import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Status: new FormControl('', Validators.required),
    select: new FormControl(false)
  });
  arrayValue: any = []
  index: any;
  formval: string = ''
  delIndex: any;
  selectedOption: any = '';
  selectDisable: boolean = false;
  selectAll: boolean = false;
  ngOnInit() {
    let value = localStorage.getItem('globalValue')
    if (value != '' && value != undefined) {
      this.arrayValue = JSON.parse(value)
      this.arrayValue.forEach((element: any) => {
        element.select = false;
      });
    }
  }

  // ------------------------Select Marked items change event--------------------->>
  selectChange() {
    this.selectDisable = this.arrayValue.some(((s: any) => s?.select == true));
  }

  //-------------------------Select All data in table------------------------------>>
  selectAllData() {
    if (this.selectAll) {
      this.arrayValue.map((element: any) => {
        element.select = true;
      });
    }
    else {
      this.arrayValue.map((element: any) => {
        element.select = false;
      });
    }
    this.selectDisable = this.arrayValue.some(((s: any) => s?.select == true));
  }

  //---------------------------Save a new Entry--------------------------->>
  save() {
    localStorage.removeItem('globalValue')
    this.arrayValue.push(this.userForm.value);
    localStorage.setItem('globalValue', JSON.stringify(this.arrayValue))
    this.userForm.reset();
  }

  //---------------------------------Update a New Entry-------------------------->>
  update() {
    if (this.arrayValue.length > 0) {
      localStorage.removeItem('globalValue')
      this.arrayValue.forEach((element: any, i: any) => {
        if (i == this.index) {
          element.Description = this.userForm.get('Description')?.value;
          element.Name = this.userForm.get('Name')?.value;
          element.Status = this.userForm.get('Status')?.value;
        }
      });
      localStorage.setItem('globalValue', JSON.stringify(this.arrayValue))
    }
  }

//-------------------------------Edit Data---------------------------------->>
  EditData(data: any, index: any) {
    this.index = index
    this.userForm.setValue(data)
  }

//-----------------------------------Delete Open Popup------------------------>>>
  DeletePopup(index: any) {
    this.delIndex = index
  }

  //-----------------------------------Delete record------------------------>>>
  Deleterecord() {
    localStorage.removeItem('globalValue')
    this.arrayValue.splice(this.delIndex, 1);
    localStorage.setItem('globalValue', JSON.stringify(this.arrayValue))
  }

//-----------------------------------Update the Selected all data--------------->>
  updateAll() {
    if (this.selectedOption != '' && this.selectedOption != null) {
      localStorage.removeItem('globalValue')
      this.arrayValue.map((element: any, index: any) => {
        if (element.select) {
          element.Status = this.selectedOption;
          element.select = false;
        }
      })
      this.selectedOption = '';
      localStorage.setItem('globalValue', JSON.stringify(this.arrayValue))
    }
  }
//-------------------------------Clear All Data------------------------>>
  clear() {
    localStorage.removeItem('globalValue');
    this.arrayValue = [];
  }

  title = 'sample-crud';
}
