import { Container } from "inversify";
import { CompanyController } from "./../controllers/company.controller";
import { CompanyRouter } from "./../routes/company.router";
import { CompanyService } from "./../services/company.service";

export const container: Container = new Container();

// container.bind(InvoiceController).toSelf().inTransientScope();
// container.bind(InvoiceRouter).toSelf().inTransientScope();
// container.bind(InvoiceService).toSelf().inSingletonScope();
// container.bind(GetInvoicesProvider).toSelf().inSingletonScope();

container.bind(CompanyController).toSelf().inTransientScope();
container.bind(CompanyRouter).toSelf().inTransientScope();
container.bind(CompanyService).toSelf().inSingletonScope();
