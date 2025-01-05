import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  /**
   * Detecta si un elemento es visible en el viewport usando IntersectionObserver.
   * @param elementRef Elemento HTML que se desea observar.
   * @param threshold Nivel de intersección para considerar visible el elemento (por defecto 0.00001).
   * @returns Promesa que se resuelve con `true` si el elemento es visible, o `false` en caso contrario.
   */
  observeVisibility(elementRef: HTMLElement, threshold: number = 0.00001): Promise<boolean> {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              resolve(true);
              observer.disconnect();
            }
          });
        },
        { threshold }
      );

      observer.observe(elementRef);
      return () => observer.disconnect();
    });
  }
}
