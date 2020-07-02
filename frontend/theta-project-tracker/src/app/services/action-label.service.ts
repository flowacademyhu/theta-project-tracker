import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ActionLabel } from '../models/action-label.model'

@Injectable({
  providedIn: 'root'
})
export class ActionLabelService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public fetchActionLabels(): Observable<ActionLabel[]> {
    return this.http.get<ActionLabel[]>(this.apiUrl + 'actionLabel');
  }
  public fetchActionLabel(id: number): Observable<ActionLabel> {
    return this.http.get<ActionLabel>(this.apiUrl + +`actionLabel/${id}`);
  }
  public addActionLabel(actionlabel: ActionLabel): Observable<ActionLabel> {
    return this.http.post<ActionLabel>(this.apiUrl + 'actionLabel', actionlabel);
  }
  public updateActionLabel(id: number, actionlabel: ActionLabel) {
    return this.http.put(this.apiUrl + `actionLabel/${id}`, actionlabel);
  }
  public deleteActionLabel(id: number): Observable<ActionLabel> {
    return this.http.delete<ActionLabel>(this.apiUrl + `actionLabel/${id}`).pipe(tap(() => this.fetchActionLabels()));
  }
}
