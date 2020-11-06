import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../shared/services/order.service';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
})
export class OrderPropertiesComponent implements OnInit {
  address: string;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.address.subscribe((value) => (this.address = value));
  }
}
