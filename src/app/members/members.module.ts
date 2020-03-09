import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule} from '@ngrx/store';
import { memberReducer} from './state/member.reducer';
import { EffectsModule, Actions} from '@ngrx/effects';
import { MemberEffect} from './state/member.effect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const memberRoutes: Routes = [
  { path: '', component: MemberListComponent },
  { path: 'add', component: MemberAddComponent },
  { path: 'edit', component: MemberEditComponent },
  { path: '**', component: MemberListComponent }
];
@NgModule({
  declarations: [MemberAddComponent, MemberEditComponent, MemberListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(memberRoutes),
    StoreModule.forFeature('members', memberReducer),
    EffectsModule.forFeature([MemberEffect])
  ]
})
export class MembersModule { }
