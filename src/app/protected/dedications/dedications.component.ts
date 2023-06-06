import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Dedication, DedicationReport } from '../interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dedications',
  templateUrl: './dedications.component.html',
  styleUrls: ['./dedications.component.scss']
})
export class DedicationsComponent implements OnInit {

  public dedications: Dedication[] = [];

  constructor(private configService: ConfigService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getDedicationsByUser();
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
          console.log(this.dedications);
        });
    } catch (error) {
      console.error(error);
    }
  }

}
