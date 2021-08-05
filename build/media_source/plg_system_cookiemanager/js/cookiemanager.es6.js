/**
 * @copyright  (C) 2021 Open Source Matters, Inc. <https://www.joomla.org>
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

((document) => {
  'use strict';

  const cookie = document.cookie.split('; ');
  const config = Joomla.getOptions('config');
  const code = Joomla.getOptions('code');
  const parse = Range.prototype.createContextualFragment.bind(document.createRange());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#cookieBanner .modal-dialog').classList.add(config.position);

    if (cookie.indexOf('cookieBanner=shown') === -1) {
      const Banner = new bootstrap.Modal(document.querySelector('#cookieBanner'));
      Banner.show();
    }

    document.querySelectorAll('[data-cookiecategory]').forEach((item) => {
      cookie.forEach((i) => {
        if (i.match(`${item.getAttribute('data-cookiecategory')}=true`)) {
          item.checked = true;
        } else if (i.indexOf(`cookie_category_${item.getAttribute('data-cookiecategory')}=false`) === -1 || i.match(`cookie_category_${item.getAttribute('data-cookiecategory')}=false`)) {
          Object.entries(code).forEach(([key, value]) => {
            if (key === item.getAttribute('data-cookiecategory')) {
              Object.values(value).forEach((val) => {
                if (val.type === '3' || val.type === '4' || val.type === '5' || val.type === '6') {
                  const q = val.code.match(/src="([^\s]*)"\s/)[1];
                  if (document.querySelector(`[src="${q}"]`)) {
                    const p = document.querySelector(`[src="${q}"]`);
                    p.setAttribute('data-src', q);
                    p.removeAttribute('src');
                  }
                } else if (val.type === '7') {
                  const q = val.code.match(/href="(.+)"/)[1];
                  if (document.querySelector(`[href="${q}"]`)) {
                    const p = document.querySelector(`[href="${q}"]`);
                    p.setAttribute('data-href', q);
                    p.removeAttribute('href');
                  }
                }
              });
            }
          });
        }
      });
    });

    document.querySelectorAll('[data-cookie-category]').forEach((item) => {
      cookie.forEach((i) => {
        if (i.match(`${item.getAttribute('data-cookie-category')}=true`)) {
          item.checked = true;
        }
      });
    });
  });

  function getExpiration() {
    const exp = config.expiration;
    const d = new Date();
    d.setTime(d.getTime() + (exp * 24 * 60 * 60 * 1000));
    const expires = d.toUTCString();
    return expires;
  }

  document.getElementById('bannerConfirmChoice').addEventListener('click', () => {
    const exp = getExpiration();
    document.querySelectorAll('[data-cookiecategory]').forEach((item) => {
      if (item.checked) {
        Object.entries(code).forEach(([key, value]) => {
          if (key === item.getAttribute('data-cookiecategory')) {
            Object.values(value).forEach((i) => {
              if (i.type === '1' || i.type === '2') {
                if (i.position === '1') {
                  document.head.prepend(parse(i.code));
                } else if (i.position === '2') {
                  document.head.append(parse(i.code));
                } else if (i.position === '3') {
                  document.body.prepend(parse(i.code));
                } else {
                  document.body.append(parse(i.code));
                }
              } else if (i.type === '3' || i.type === '4' || i.type === '5' || i.type === '6') {
                const q = i.code.match(/src="([^\s]*)"\s/)[1];
                if (document.querySelector(`[data-src="${q}"]`)) {
                  const p = document.querySelector(`[data-src="${q}"]`);
                  p.setAttribute('src', q);
                  p.removeAttribute('data-src');
                }
              } else {
                const q = i.code.match(/href="(.+)"/)[1];
                if (document.querySelector(`[data-href="${q}"]`)) {
                  const p = document.querySelector(`[data-href="${q}"]`);
                  p.setAttribute('href', q);
                  p.removeAttribute('data-href');
                }
              }

              document.cookie = `cookie_category_${key}=true; expires=${exp}; path=/;`;
            });
          }
        });
      } else {
        const key = item.getAttribute('data-cookiecategory');
        document.cookie = `cookie_category_${key}=false; expires=${exp}; path=/;`;
      }
    });
    document.cookie = `cookieBanner=shown; expires=${exp}; path=/;`;
  });

  document.getElementById('prefConfirmChoice').addEventListener('click', () => {
    const exp = getExpiration();
    document.querySelectorAll('[data-cookie-category]').forEach((item) => {
      if (item.checked) {
        Object.entries(code).forEach(([key, value]) => {
          if (key === item.getAttribute('data-cookie-category')) {
            Object.values(value).forEach((i) => {
              if (i.type === '1' || i.type === '2') {
                if (i.position === '1') {
                  document.head.prepend(parse(i.code));
                } else if (i.position === '2') {
                  document.head.append(parse(i.code));
                } else if (i.position === '3') {
                  document.body.prepend(parse(i.code));
                } else {
                  document.body.append(parse(i.code));
                }
              } else if (i.type === '3' || i.type === '4' || i.type === '5' || i.type === '6') {
                const q = i.code.match(/src="([^\s]*)"\s/)[1];
                if (document.querySelector(`[data-src="${q}"]`)) {
                  const p = document.querySelector(`[data-src="${q}"]`);
                  p.setAttribute('src', q);
                  p.removeAttribute('data-src');
                }
              } else {
                const q = i.code.match(/href="(.+)"/)[1];
                if (document.querySelector(`[data-href="${q}"]`)) {
                  const p = document.querySelector(`[data-href="${q}"]`);
                  p.setAttribute('href', q);
                  p.removeAttribute('data-href');
                }
              }

              document.cookie = `cookie_category_${key}=true; expires=${exp}; path=/;`;
            });
          }
        });
      } else {
        const key = item.getAttribute('data-cookie-category');
        document.cookie = `cookie_category_${key}=false; expires=${exp}; path=/;`;
      }
    });
    document.cookie = `cookieBanner=shown; expires=${exp}; path=/;`;
  });

  document.querySelectorAll('a[data-bs-toggle="collapse"]').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.innerText === Joomla.Text._('COM_COOKIEMANAGER_PREFERENCES_MORE_BUTTON_TEXT')) {
        item.innerText = Joomla.Text._('COM_COOKIEMANAGER_PREFERENCES_LESS_BUTTON_TEXT');
      } else {
        item.innerText = Joomla.Text._('COM_COOKIEMANAGER_PREFERENCES_MORE_BUTTON_TEXT');
      }
    });
  });
})(document);
