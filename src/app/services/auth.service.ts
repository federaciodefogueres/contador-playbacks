import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, getAuth, signOut, Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  async login(email: string, password: string) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
        const user = userCredential.user;
        localStorage.setItem('user', user.email!);
        this.router.navigate(['/administracion']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        
      });
  }

  getFirebaseUser(): any {
      return this.auth.currentUser;
  }

  logout() {
      localStorage.removeItem('user');
      signOut(this.auth);
      this.router.navigateByUrl('timer');
  }
  
  resetPassword(email: string) {
      return sendPasswordResetEmail(this.auth, email);
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user')!;
    return user !== null;
  }

}
