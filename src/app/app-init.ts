// app-init.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  load(): Promise<void> {
    return new Promise((resolve) => {
      console.log('🔁 APP_INITIALIZER is running...');
      setTimeout(() => {
        console.log('✅ App initialized');
        resolve();
      }, 1000); // giả lập gọi API hoặc logic async
    });
  }
}
