export interface StoredFile {
  file: File;
  url?: string;
  deleted: boolean;
}

export interface KeycloakLoginResponse {
  access_token: string,
  refresh_token: string,
}

