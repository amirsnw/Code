import {Component, ComponentFactoryResolver, Injector, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AgentConscriptionComponent} from './sso-conscription/agent-conscription.component';

@Component({
  selector: 'app-agent-conscription',
  templateUrl: './sso-agent-conscription.component.html',
  styleUrls: ['./sso-agent-conscription.component.css']
})
export class SsoAgentConscriptionComponent extends TaminPageBaseComponent {

  @ViewChild('consContainer', {read: ViewContainerRef}) consContainer: ViewContainerRef;
  isDisabled: boolean;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  initializePage() {
    this.isDisabled = false;
  }

  onSearch(otpFields: any) {
    if (otpFields.timeStamp) {
      return;
    }
    let componentFactory;
    let componentRef;
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(AgentConscriptionComponent);
    this.consContainer.clear();
    componentRef = this.consContainer.createComponent(componentFactory);
    componentRef.instance.ssoNationalCode = otpFields.nationalCode;
    componentRef.instance.ssoTicket = otpFields.ticketCode;
  }
}
