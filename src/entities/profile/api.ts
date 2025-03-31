import type { TProfile, TUpdateProfileDTO } from './type';
import mock from './mock.json';

const DEMO_PROFILE_KEY = 'profile_key';

class ProfileService {
  getMe(token: string): Promise<TProfile> {
    console.log(`get profile for ${token}`);

    return new Promise((res) => {
      setTimeout(() => {
        let profile = mock as TProfile;
        try {
          profile = JSON.parse(localStorage.getItem(DEMO_PROFILE_KEY)) || profile;
        } catch (error) {
          //
        }
        res(profile);
      }, 500);
    });
  }

  updateProfile(newProfile: TUpdateProfileDTO): Promise<TProfile> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let profile = mock as TProfile;
        try {
          profile = JSON.parse(localStorage.getItem(DEMO_PROFILE_KEY)) || profile;
          localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify({ ...profile, ...newProfile }));
          res(profile);
        } catch (error) {
          rej(error);
        }
      }, 500);
    });
  }
}

export default new ProfileService();
