import { app } from 'electron'
import path from 'path'
import EnvPaths from 'common/envPaths'
import { ensureDirSync } from 'common/filesystem'

class AppPaths extends EnvPaths {
  /**
   * Configure and sets all application paths.
   *
   * @param userDataPath The user data path or empty string for default.
   */
  constructor(userDataPath: string = '') {
    if (!userDataPath) {
      // Keep existing documents, preferences and recovery data when rebranding.
      userDataPath = path.join(app.getPath('appData'), 'marktext')
    }

    super(userDataPath)

    // Changing the user data directory is only allowed during application bootstrap.
    app.setPath('userData', this.electronUserDataPath)
  }
}

export const ensureAppDirectoriesSync = (paths: AppPaths): void => {
  ensureDirSync(paths.userDataPath)
  ensureDirSync(paths.logPath)
  // TODO(sessions): enable this...
  // ensureDirSync(paths.electronUserDataPath)
  // ensureDirSync(paths.globalStorage)
  // ensureDirSync(paths.preferencesPath)
  // ensureDirSync(paths.sessionsPath)
}

export default AppPaths
