import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminTemplateComponent } from './adminTemplate/admin-template/admin-template.component';
import { HeaderComponent } from './adminTemplate/header/header.component';
import { LeftbarComponent } from './adminTemplate/leftbar/leftbar.component';
import { AjoutCompteComponent } from './adminTemplate/ajout-compte/ajout-compte.component';
import { ModifCompteComponent } from './adminTemplate/modif-compte/modif-compte.component';
import { SupprimeCompteComponent } from './adminTemplate/supprime-compte/supprime-compte.component';
import { ContentComponent } from './adminTemplate/content/content.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MomentModule } from 'ngx-moment';
import {NgxPaginationModule}from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { AjoutCategorieComponent } from './adminTemplate/ajout-categorie/ajout-categorie.component';
import { ModifCategorieComponent } from './adminTemplate/modif-categorie/modif-categorie.component';
import { ContentCategorieComponent } from './adminTemplate/content-categorie/content-categorie.component';
import { DisplayProduitsCatComponent } from './adminTemplate/display-produits-cat/display-produits-cat.component';
import { ContentProduitComponent } from './adminTemplate/content-produit/content-produit.component';
import { AjoutProduitComponent } from './adminTemplate/ajout-produit/ajout-produit.component';
import { ModifProduitComponent } from './adminTemplate/modif-produit/modif-produit.component';
import { ClientContentComponent } from './clientTemplate/client-content/client-content.component';
import { ClientTemplateComponent } from './clientTemplate/client-template/client-template.component';
import { ClientHeaderComponent } from './clientTemplate/client-header/client-header.component';
import { ClientFooterComponent } from './clientTemplate/client-footer/client-footer.component';
import { ClientPubComponent } from './clientTemplate/client-pub/client-pub.component';
import { SearchAjoutComponent } from './adminTemplate/search-ajout/search-ajout.component';
import { LoginComponent } from './clientTemplate/login/login.component';
import { ClientLeftbarComponent } from './clientTemplate/client-leftbar/client-leftbar.component';
import { AccesAdminGuard } from './guard/acces-admin.guard';
import { AccesLoginGuard } from './guard/acces-login.guard';
import { HomeContentComponent } from './clientTemplate/home-content/home-content.component';
import { DetailAccountAdminComponent } from './adminTemplate/detail-account-admin/detail-account-admin.component';
import { AccesClientGuard } from './guard/acces-client.guard';
import { ContactUsComponent } from './clientTemplate/contact-us/contact-us.component';
import { TemplateComponent } from './template/template.component';
import { ListeCommandeComponent } from './adminTemplate/liste-commande/liste-commande.component';
import { DetailCommandeComponent } from './adminTemplate/detail-commande/detail-commande.component';
import { DashboardComponent } from './adminTemplate/dashboard/dashboard.component';
import { ListFavorisComponent } from './clientTemplate/list-favoris/list-favoris.component';
import { PannierComponent } from './clientTemplate/pannier/pannier.component';
import { CheckOutComponent } from './clientTemplate/check-out/check-out.component';
import { SuccesCheckoutComponent } from './clientTemplate/succes-checkout/succes-checkout.component';
import { ShopComponent } from './clientTemplate/shop/shop.component';
import { ProductDetailComponent } from './clientTemplate/product-detail/product-detail.component';
import { DetailCompteClientComponent } from './clientTemplate/detail-compte-client/detail-compte-client.component';
import { OrderHistoryComponent } from './clientTemplate/order-history/order-history.component';
import { OrderDetailsComponent } from './clientTemplate/order-details/order-details.component';
import { ChoiceAccountCreateComponent } from './clientTemplate/choice-account-create/choice-account-create.component';
import { CreateCustomerAccountComponent } from './clientTemplate/create-customer-account/create-customer-account.component';
import { CreateVendorAccountComponent } from './clientTemplate/create-vendor-account/create-vendor-account.component';
import { SuccesComponent } from './clientTemplate/succes/succes.component';
import { CancelComponent } from './clientTemplate/cancel/cancel.component';
import { PaymentComponent } from './clientTemplate/payment/payment.component';
import { AuthGuardService } from './guard/acces-if-loged.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './clientTemplate/forgot-password/forgot-password.component';
import { InitPasswordComponent } from './clientTemplate/init-password/init-password.component';
import { AjoutVendeurComponent } from './adminTemplate/ajout-vendeur/ajout-vendeur.component';
import { ShareAdminVendeurGuard } from './guard/share-admin-vendeur.guard';
import { AbonnementComponent } from './adminTemplate/abonnement/abonnement.component';
import { AboutUsComponent } from './clientTemplate/about-us/about-us.component';
import { RecommandationComponent } from './adminTemplate/recommandation/recommandation.component';
import {ChatModule} from './clientTemplate/chat-dialog/chat.module'
const routes: Routes = [
  {path:'home',component:ContentComponent,canActivate:[AccesAdminGuard]},
  {path:'ajout',component:AjoutCompteComponent,canActivate:[AccesAdminGuard]},
  {path:'ajoutVendeur',component:AjoutVendeurComponent,canActivate:[AccesAdminGuard]},
  {path:'content/modif/:id',component:ModifCompteComponent,canActivate:[AccesAdminGuard]},
  {path:'content/bannir/:id',component:SupprimeCompteComponent,canActivate:[AccesAdminGuard]},
  {path:'content',component:ContentComponent,canActivate:[AccesAdminGuard]},
  {path:'contentCategorie',component:ContentCategorieComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'ajoutCategorie',component:AjoutCategorieComponent,canActivate:[AccesAdminGuard]},
  {path:'contentCategorie/produits/:id',component:DisplayProduitsCatComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'ajoutProduit',component:AjoutProduitComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'contentProduit',component:ContentProduitComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'contentProduit/modifProduit/:id',component:ModifProduitComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'contentCategorie/modifCategorie/:id',component:ModifCategorieComponent,canActivate:[AccesAdminGuard]},
  {path:'login',component:LoginComponent,canActivate:[AccesLoginGuard]},
  {path:'detailAccountAdmin',component:DetailAccountAdminComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'detailAccountAdmin/modif/:id',component:ModifCompteComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'contactUs',component:ContactUsComponent,canActivate:[AccesClientGuard]}, 
  {path:'listeCommandes',component:ListeCommandeComponent,canActivate:[AccesAdminGuard]},
  {path:'listeCommandes/detail/:id',component:DetailCommandeComponent,canActivate:[AccesAdminGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'listFavoris',component:ListFavorisComponent,canActivate:[AccesClientGuard]},
  {path:'pannier',component:PannierComponent,canActivate:[AccesClientGuard]},
  {path:'pannier/checkOut',component:CheckOutComponent,canActivate:[AuthGuardService]},
  {path:'succesCheckOut',component:SuccesCheckoutComponent,canActivate:[AccesClientGuard]},
  {path:'shop',component:ShopComponent,canActivate:[AccesClientGuard]},
  {path:'shop/detail/:id',component:ProductDetailComponent,canActivate:[AccesClientGuard]},
  {path:'detailCompteClient',component:DetailCompteClientComponent,canActivate:[AccesClientGuard]},
  {path:'orderHistory',component:OrderHistoryComponent,canActivate:[AccesClientGuard]},
  {path:'orderHistory/orderDetails/:id',component:OrderDetailsComponent,canActivate:[AccesClientGuard]},
  {path:'login/compte',component:ChoiceAccountCreateComponent,canActivate:[AccesClientGuard]},
  {path:'login/compte/createCustomerAccount',component:CreateCustomerAccountComponent},
  {path:'login/compte/createVendorAccount',component:CreateVendorAccountComponent},
  {path:'payment',component:PaymentComponent,canActivate:[AccesClientGuard]},
  {path:'succes',component:SuccesComponent,canActivate:[AccesClientGuard]},
  {path:'cancel',component:CancelComponent,canActivate:[AccesClientGuard]},
  {path:'login/forgotPassword',component:ForgotPasswordComponent},
  {path:'login/forgotPassword/InitPassword',component:InitPasswordComponent},
  {path:'abonnement',component:AbonnementComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'aboutUs',component:AboutUsComponent,canActivate:[AccesClientGuard]},
  {path:'recommandation',component:RecommandationComponent,canActivate:[ShareAdminVendeurGuard]},
  {path:'',component:HomeContentComponent,canActivate:[AccesClientGuard]}
  
];
@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HeaderComponent,
    LeftbarComponent,
    AjoutCompteComponent,
    ModifCompteComponent,
    SupprimeCompteComponent,
    ContentComponent,
    AjoutCategorieComponent,
    ModifCategorieComponent,
    ContentCategorieComponent,
    DisplayProduitsCatComponent,
    ContentProduitComponent,
    AjoutProduitComponent,
    ModifProduitComponent,
    ClientContentComponent,
    ClientTemplateComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    ClientPubComponent,
    SearchAjoutComponent,
    LoginComponent,
    ClientLeftbarComponent,
    HomeContentComponent,
    DetailAccountAdminComponent,
    ContactUsComponent,
    TemplateComponent,
    ListeCommandeComponent,
    DetailCommandeComponent,
    DashboardComponent,
    ListFavorisComponent,
    PannierComponent,
    CheckOutComponent,
    SuccesCheckoutComponent,
    ShopComponent,
    ProductDetailComponent,
    DetailCompteClientComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    ChoiceAccountCreateComponent,
    CreateCustomerAccountComponent,
    CreateVendorAccountComponent,
    SuccesComponent,
    CancelComponent,
    PaymentComponent,
    ForgotPasswordComponent,
    InitPasswordComponent,
    AjoutVendeurComponent,
    AbonnementComponent,
    AboutUsComponent,
    RecommandationComponent,
  ],
  imports: [
    BrowserModule,
    ChatModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule ,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgImageSliderModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
    
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
