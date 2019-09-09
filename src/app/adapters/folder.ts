export class Folder {
  public id: number;
  public label: string;
  public data: string;
  public expandedIcon: string;
  public collapsedIcon: string;
  public icon: string;
  public children: Array<any>;
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.label = data.name;
      this.data = data.name;
      this.children = [
        {label: '', data: ''}
        ];
      if (data.type === 'FOLDER') {
        this.expandedIcon = 'fa fa-folder-open';
        this.collapsedIcon = 'fa fa-folder';
      }
      if (data.type === 'LEAVE') {
        this.expandedIcon = 'fa fa-folder-open';
        this.collapsedIcon = 'fa fa-folder';
      }
    }
  }
}