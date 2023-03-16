import { Claim } from './claim';

export class Role {
  Id: string | undefined;
  name: string | undefined;
  normalizedName: string | undefined;
  version: string | undefined;
  displayName: string | undefined;
  canDelete: boolean | undefined;
  claims: Claim[] | undefined;
}
