import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { LoadBalancerPolicy, LoadBalancerPolicySelectLabel } from 'src/app/core/model/api-cluster.model';

@Component({
  selector: 'blogsphere-cluster-filter-form',
  templateUrl: './cluster-filter-form.component.html',
  styleUrls: ['./cluster-filter-form.component.scss'],
})
export class ClusterFilterFormComponent implements OnInit {
  @Input() filterForm: FormGroup;
  public loadBalancerPolicyOptions: LoadBalancerPolicy[] = Object.values(LoadBalancerPolicy);
  public loadBalancerLabel(option: LoadBalancerPolicy): string {
    return LoadBalancerPolicySelectLabel[option];
  }

  fromMinDate: Date = new Date(2000, 0, 1);
  fromMaxDate: Date = new Date();
  toMinDate: Date = new Date(2000, 0, 1);
  toMaxDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(value => {
      const { fromDate, toDate } = value;
      const fromDateMoment = moment(fromDate);
      const toDateMoment = moment(toDate);

      if (fromDate && !toDate) {
        this.toMinDate = fromDateMoment.add(1, 'day').toDate();
      }
      if (toDate && fromDate && toDateMoment.isBefore(fromDateMoment)) {
        this.filterForm.get('toDate').reset();
      }
      if (toDate && fromDate && toDateMoment.isAfter(fromDateMoment)) {
        this.toMinDate = fromDateMoment.add(1, 'day').toDate();
      }
    });
  }
}
