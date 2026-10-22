# Nginx notes for 3d-furniture-ar

The site is a static export (`pnpm build` writes `out/`). Deploy is roadmap phase 7:
rsync `out/` to `/srv/static/3d-furniture-ar`. The `.glb` files need the right MIME
type and long cache headers; Next.js static export cannot set headers itself.

```nginx
server {
    server_name 3d-furniture-ar.ali-moradi-develop.com;
    root /srv/static/3d-furniture-ar;
    index index.html;

    types {
        model/gltf-binary glb;
    }

    location ~* \.(glb|wasm)$ {
        add_header Cache-Control "public, max-age=2592000";  # 30 days
    }
    location ~* \.(webp|js|css)$ {
        add_header Cache-Control "public, max-age=2592000";
    }
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location / {
        try_files $uri $uri/ =404;
    }
    # certbot adds the 443 / certificate lines
}
```

Model files are not content-hashed, so rename the file (or purge) when a model changes.
AR needs HTTPS (WebXR and camera access), which certbot provides.
