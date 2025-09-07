# Changelog - Mahdy Project

## [1.1.0] - 2025-01-27

### Changed
- **Project Rename**: Changed project name from "Moassel" to "Mahdy" across all files
- **Container Names**: Updated container names from `moassel-*` to `mahdy-*`
- **Network Name**: Updated Docker network from `moassel-network` to `mahdy-network`
- **Package Names**: Updated package names in package.json files
- **Documentation**: Updated all README files and documentation
- **UI Text**: Updated frontend text and translations

### Files Updated
- `docker-compose.yml` - Container and network names
- `backend/package.json` - Package name and description
- `frontend/index.html` - Page title and content
- `frontend/script.js` - Translations and text
- `README.md` - Main documentation
- `ARCHITECTURE.md` - Architecture documentation
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Frontend documentation
- `Makefile` - Project name in help text
- `start.bat` - Windows startup script
- `start.sh` - Linux/Mac startup script
- `env.example` - Environment variables
- `package.json` - Root package name
- `index.nginx-debian.html` - Legacy file updates

### Technical Details
- **Container Names**: 
  - `moassel-backend` → `mahdy-backend`
  - `moassel-frontend` → `mahdy-frontend`
- **Network Name**: `moassel-network` → `mahdy-network`
- **Package Names**: `moassel-backend` → `mahdy-backend`
- **Project Title**: "Moassel Project" → "Mahdy Project"
- **Domain References**: "moassel.online" → "mahdy.online"

### Migration Notes
- All existing containers and networks will need to be recreated
- Run `docker-compose down` then `docker-compose up --build` to apply changes
- No breaking changes to API endpoints or functionality
- All features remain the same, only naming has changed

### Verification
- All "moassel" references removed
- All "mahdy" references added correctly
- Docker configuration updated
- Documentation updated
- Frontend content updated
- Backend configuration updated

## [1.2.0] - 2025-01-27

### Changed
- **Language**: Converted all documentation to English only
- **Emojis**: Removed all emojis from documentation and scripts
- **Documentation**: Cleaned up and standardized all README files
- **Scripts**: Updated all shell scripts and batch files

### Files Updated
- `README.md` - Converted to English, removed emojis
- `backend/README.md` - Converted to English, removed emojis
- `frontend/README.md` - Converted to English, removed emojis
- `ARCHITECTURE.md` - Converted to English, removed emojis
- `Makefile` - Cleaned up help text
- `start.bat` - Removed emojis from output
- `start.sh` - Removed emojis from output
- `CHANGELOG.md` - Converted to English, removed emojis

### Technical Details
- All Arabic text removed from documentation
- All emojis removed from headers and content
- Standardized English terminology throughout
- Clean, professional documentation style

### Migration Notes
- No functional changes, only documentation updates
- All commands and functionality remain the same
- Documentation is now more professional and standardized