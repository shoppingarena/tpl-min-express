# PNPM ALIASES TO SPEED UP YOUR WORKFLOW

🚀 Basic pnpm Aliases
alias p="pnpm"                        # Shorter pnpm command
alias pi="pnpm install"               # Install dependencies
alias pr="pnpm run"                   # Run scripts
alias pt="pnpm test"                  # Run tests
alias px="pnpm exec"                  # Execute binaries
alias pu="pnpm update"                # Update all dependencies
alias pwhy="pnpm why"                 # Check why a package is installed
alias pl="pnpm list --depth=0"        # List top-level dependencies
🔄 Managing Dependencies
alias pa="pnpm add"                   # Install a package
alias pad="pnpm add -D"               # Install as a dev dependency
alias pag="pnpm add -g"               # Install globally
alias par="pnpm remove"               # Remove a package
alias pc="pnpm clean"                 # Clean pnpm store
📦 Workspace & Monorepo Commands
alias pws="pnpm workspaces list"      # List all workspaces
alias pwi="pnpm recursive install"    # Install all workspace dependencies
alias pwa="pnpm recursive run"        # Run a command in all workspaces
alias pwt="pnpm recursive test"       # Run tests in all workspaces
alias pwb="pnpm recursive build"      # Build all workspaces
🔍 Debugging & Logs
alias pdev="pnpm run dev"             # Run development server
alias pbuild="pnpm run build"         # Build project
alias plogs="pnpm run logs"           # Show logs (if defined in package.json)
alias pscripts="cat package.json | jq .scripts" # List scripts in package.json
🌍 Global Package Management
alias pgl="pnpm list -g --depth=0"    # List globally installed packages
alias pgu="pnpm update -g"            # Update global packages
alias pgr="pnpm remove -g"            # Remove a global package
🔥 Bonus: Auto-Source .bashrc After Editing
alias reload="source ~/.bashrc && echo 'Bash config reloaded! ✅'"
