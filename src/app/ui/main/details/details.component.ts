import {Component, Input} from '@angular/core'
import {NlpQueryState} from '../../../services/nlp/nlp.model'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    @Input()
    query: NlpQueryState
}
