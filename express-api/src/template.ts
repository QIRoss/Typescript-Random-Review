// src/template.ts

export class Template<T> {
    private items: T[] = [];
  
    addItem(item: T): void {
      this.items.push(item);
    }
  
    getItems(): T[] {
      return this.items;
    }
  
    getItemByIndex(index: number): T | null {
      return this.items[index] || null;
    }
  
    removeItem(index: number): T | null {
      if (index >= 0 && index < this.items.length) {
        return this.items.splice(index, 1)[0] || null;
      }
      return null;
    }
  }
  