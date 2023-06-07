import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ConfigService } from '../services/config.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Dedication, DedicationWork, Project } from '../interfaces/interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dedications',
  templateUrl: './dedications.component.html',
  styleUrls: ['./dedications.component.scss']
})
export class DedicationsComponent implements OnInit {

  public dedications: Dedication[] = [];
  public projects: Project[] = [];
  public dedicationForm: FormGroup;
  public startDateValue: string | null = null;
  public endDateValue: string | null = null;
  public isMonday = true;
  public isSunday = true;
  public isOneWeek = true;
  public projectUid = '';

  constructor(private configService: ConfigService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.dedicationForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      hours: ['', [Validators.required, Validators.min(0), Validators.max(45)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getDedicationsByUser();
    this.getCompanyProjects();
  }

  async getDedicationsByUser() {
    try {
      const userId = this.authService.user.uid;
      await this.configService.getDedicationsByUser(userId)
        .subscribe(resp => {
          this.dedications = resp.dedications;
          this.dedications = resp.dedications.map(dedication => {
            dedication.startDate = this.configService.formatDate(dedication.startDate.toString());
            dedication.endDate = this.configService.formatDate(dedication.endDate.toString());
            return dedication;
          });
        });
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error, 'error');
    }
  }

  async createDedicationWork() {
    try {
      if (this.dedicationForm.invalid) {
        return;
      }

      const dedicationWorkToRegister: DedicationWork = {
        project: this.dedicationForm.get('projectName')?.value,
        hours: this.dedicationForm.get('hours')?.value,
        startDate: this.dedicationForm.get('startDate')?.value,
        endDate: this.dedicationForm.get('endDate')?.value,
        user: this.authService.user.uid
      }

      await this.configService.createDedicationWork(dedicationWorkToRegister)
        .subscribe(
          resp => {
            Swal.fire('Success', 'Dedication work created successfully', 'success');
            this.clearForm();
            this.refreshView();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 409) {
              Swal.fire('Error', 'You have already registered a dedication hours to this project and week', 'error');
            } else {
              Swal.fire('Error', 'An error occurred', 'error');
            }
          }
        );
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error, 'error');
    }
  }

  refreshView() {
    this.getDedicationsByUser();
  }

  async getCompanyProjects() {
    try {
      await this.configService.getAllProjects()
        .subscribe(resp => {
          const { projects } = resp;
          this.projects = projects;
        });
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error, 'error');
    }
  }

  clearForm() {
    this.dedicationForm.reset();
  }

  onDateInput(event: any, date: any): boolean {
    this.dateInputsAreValid();
    if (date === 'startDate') {
      if (this.checkIsMonday(event.target.value)) {
        this.startDateValue = event.target.value;
        return true;
      } else {
        return false;
      }
    } else if (date === 'endDate') {
      if (this.checkIsSunday(event.target.value)) {
        this.endDateValue = event.target.value;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkIsMonday(incomingDate: string): boolean {
    const date = new Date(incomingDate);
    date.setUTCHours(0, 0, 0, 0); // Set the time to midnight in UTC
    const dayOfWeek = date.getUTCDay(); // Get the day of the week in UTC
    if (dayOfWeek === 1) { // 1 represents Monday (Sunday is 0)
      this.isMonday = true;
      return true;
    } else {
      this.isMonday = false;
      return false;
    }
  }

  checkIsSunday(incomingDate: string): boolean {
    const date = new Date(incomingDate);
    date.setUTCHours(0, 0, 0, 0); // Set the time to midnight in UTC
    const dayOfWeek = date.getUTCDay(); // Get the day of the week in UTC
    if (dayOfWeek === 0) { // 1 represents Monday (Sunday is 0)
      this.isSunday = true;
      return true;
    } else {
      this.isSunday = false;
      return false;
    }
  }

  dateInputsAreValid(): boolean {
    if (this.dedicationForm.get('startDate')?.valid && this.dedicationForm.get('endDate')?.valid) {
      return this.isOneWeekDifference();
    } else {
      return false;
    }
  }

  isOneWeekDifference(): boolean {
    let startDateValue = this.dedicationForm.get('startDate')!.value;
    let endDateValue = this.dedicationForm.get('endDate')!.value;
    let startDateDay = startDateValue.split('-')[2];
    let endDateDay = endDateValue.split('-')[2];

    if (((parseInt(endDateDay, 10) + 1) - parseInt(startDateDay, 10)) === 7) {
      this.isOneWeek = true;
      return true;
    } else {
      this.isOneWeek = false;
      return false;
    }
  }

}
