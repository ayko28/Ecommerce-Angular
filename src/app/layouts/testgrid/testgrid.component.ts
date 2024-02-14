import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

interface Row {
  id: number;
  subject: string | null;subjects?:any|null;
  marks: number | null;
  subjectControl: FormControl;
  marksControl: FormControl;
}

@Component({
  selector: 'app-testgrid',
  templateUrl: './testgrid.component.html',
  styleUrls: ['./testgrid.component.scss']
})
export class TestgridComponent {
  rows: Row[] = [];
  private subjectSearches = new Subject<string>();

  ngOnInit(): void {
    this.addRow();
    this.subjectSearches.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((term) => {
      // Implement your subject search logic here
      // Call your service or use an array to filter subjects based on the term
      // For now, I'm using a simple list of subjects
      const subjects = ['Maths', 'Phy', 'Chem'];
    //  const filteredSubjects = subjects.filter(subject => subject.toLowerCase().includes(term.toLowerCase()));
    const filteredSubjects = ['Phy','Chem']
      // Update the subject list in the rows
      this.rows.forEach(row => {
        row.subjects = filteredSubjects;
      });
    });
  }

  addRow(): void {
    const newRow: Row = {
      id: this.rows.length + 1,
      subject: null,
      marks: null,
      subjectControl: new FormControl(),
      marksControl: new FormControl()
    };
    this.rows.push(newRow);
  }

  searchSubjects(row: Row): Observable<string[]> {console.log('searchng.....................')
    this.subjectSearches.next(row.subjectControl.value || ''); // Emit the term when the user types in the input
    return of(row.subjects || []); // Return the filtered subjects for the typeahead
  }
}
