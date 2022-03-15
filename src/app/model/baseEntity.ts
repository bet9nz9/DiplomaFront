export class BaseEntity {
  id: number;
  name: string;
  description: string;

  constructor(obj: any) {
    if(obj != null) {
      this.id = obj && obj.id || null;
      this.name = obj && obj.name || null;
      this.description = obj && obj.description || null;
    }
  }
}
