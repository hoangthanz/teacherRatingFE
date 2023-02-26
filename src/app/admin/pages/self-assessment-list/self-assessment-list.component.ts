import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {ResultRespond} from "../../../core/enums/result-respond";
import {SelfCriticism} from "../../../core/models/self-criticism";
import {NzMessageService} from "ng-zorro-antd/message";

interface DataItem {
    name: string;
    age: number;
    address: string;
}

@Component({
    selector: 'app-self-assessment-list',
    templateUrl: './self-assessment-list.component.html',
    styleUrls: ['./self-assessment-list.component.css']
})
export class SelfAssessmentListComponent implements OnInit {

    constructor(
        public apiService: ApiService,
        public message: NzMessageService
    ) {
        this.getSelfAssessmentList();
    }

    seflAssessmentList: SelfCriticism[] = [];
    searchValue = '';
    visible = false;
    listOfData: DataItem[] = [
        {
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];
    listOfDisplayData = [...this.listOfData];

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    search(): void {
        this.visible = false;
        this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
    }

    ngOnInit(): void {
    }


    getSelfAssessmentList() {
        const currentUserId = localStorage.getItem("current_user_id");
        if(currentUserId == null) return;
        this.apiService.getSelfCriticismByUserId(currentUserId).subscribe((response: any) => {
            if (response.result === ResultRespond.Success) {
                this.seflAssessmentList = response.data;
            }
        })
    }

    updateSelfAssessment(selfCriticism: SelfCriticism, isSubmitted: boolean) {
        const currentUserId = localStorage.getItem("current_user_id");
        if(currentUserId == null) return;

        selfCriticism.isSubmitted = isSubmitted;
        this.apiService.updateStatusAssessment(currentUserId, isSubmitted, selfCriticism.id).subscribe((response: any) => {
            if (response.result === ResultRespond.Success) {
                this.getSelfAssessmentList();
                this.createMessage('success', 'Cập nhật thành công');
            }
        })
    }

    createMessage(type: string, message: string): void {
        this.message.create(type, `${message}`);
    }

}
