!(function () {
	'use strict';
	function e(e, t, n, a) {
		return new (n || (n = Promise))(function (r, o) {
			function i(e) {
				try {
					l(a.next(e));
				} catch (e) {
					o(e);
				}
			}
			function s(e) {
				try {
					l(a.throw(e));
				} catch (e) {
					o(e);
				}
			}
			function l(e) {
				var t;
				e.done
					? r(e.value)
					: ((t = e.value),
					  t instanceof n
							? t
							: new n(function (e) {
									e(t);
							  })).then(i, s);
			}
			l((a = a.apply(e, t || [])).next());
		});
	}
	function t(e, t) {
		var n,
			a,
			r,
			o,
			i = {
				label: 0,
				sent: function () {
					if (1 & r[0]) throw r[1];
					return r[1];
				},
				trys: [],
				ops: [],
			};
		return (
			(o = { next: s(0), throw: s(1), return: s(2) }),
			'function' == typeof Symbol &&
				(o[Symbol.iterator] = function () {
					return this;
				}),
			o
		);
		function s(o) {
			return function (s) {
				return (function (o) {
					if (n) throw new TypeError('Generator is already executing.');
					for (; i; )
						try {
							if (
								((n = 1),
								a &&
									(r =
										2 & o[0]
											? a.return
											: o[0]
											? a.throw || ((r = a.return) && r.call(a), 0)
											: a.next) &&
									!(r = r.call(a, o[1])).done)
							)
								return r;
							switch (((a = 0), r && (o = [2 & o[0], r.value]), o[0])) {
								case 0:
								case 1:
									r = o;
									break;
								case 4:
									return i.label++, { value: o[1], done: !1 };
								case 5:
									i.label++, (a = o[1]), (o = [0]);
									continue;
								case 7:
									(o = i.ops.pop()), i.trys.pop();
									continue;
								default:
									if (
										!((r = i.trys),
										(r = r.length > 0 && r[r.length - 1]) ||
											(6 !== o[0] && 2 !== o[0]))
									) {
										i = 0;
										continue;
									}
									if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
										i.label = o[1];
										break;
									}
									if (6 === o[0] && i.label < r[1]) {
										(i.label = r[1]), (r = o);
										break;
									}
									if (r && i.label < r[2]) {
										(i.label = r[2]), i.ops.push(o);
										break;
									}
									r[2] && i.ops.pop(), i.trys.pop();
									continue;
							}
							o = t.call(e, i);
						} catch (e) {
							(o = [6, e]), (a = 0);
						} finally {
							n = r = 0;
						}
					if (5 & o[0]) throw o[1];
					return { value: o[0] ? o[1] : void 0, done: !0 };
				})([o, s]);
			};
		}
	}
	var n = function () {
			return (n =
				Object.assign ||
				function (e) {
					for (var t, n = 1, a = arguments.length; n < a; n++)
						for (var r in (t = arguments[n]))
							Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
					return e;
				}).apply(this, arguments);
		},
		a = {
			getHackathonData: function (e) {
				return r.get(r._PREFIX + 'hackathons/' + e).then(function (e) {
					var t, n;
					if (!(null == e ? void 0 : e.error))
						return {
							uuid: e.uuid,
							slug: e.slug,
							name: e.name,
							regEndsAt:
								null === (t = null == e ? void 0 : e.hackathon_setting) ||
								void 0 === t
									? void 0
									: t.reg_ends_at,
							regStartsAt:
								null === (n = null == e ? void 0 : e.hackathon_setting) ||
								void 0 === n
									? void 0
									: n.reg_starts_at,
							endsAt: null == e ? void 0 : e.ends_at,
							devfolioOfficial:
								(null == e ? void 0 : e.devfolio_official) || !1,
						};
					throw e.error;
				});
			},
			signIn: function (e, t, n) {
				return r
					.post(r._PREFIX + 'users/signin', {
						username: e,
						password: t,
						captcha_response: n,
					})
					.then(function (t) {
						var n;
						if (!(null == t ? void 0 : t.error))
							return {
								username: t.username,
								uuid: t.uuid,
								roles: t.roles,
								accessToken: t.access_token,
								refreshToken: t.refresh_token,
							};
						var r = [];
						switch (
							null === (n = t.error) || void 0 === n ? void 0 : n.message
						) {
							case 'Invalid username':
								r.push({
									field: 'id',
									message:
										"Sorry, we couldn't find an account with that username.",
								});
								break;
							case 'Account with this email or username does not exists':
								r.push({
									field: 'id',
									message:
										"Sorry, we couldn't find an account with that " +
										(e.includes('@') ? 'email' : 'username'),
								});
								break;
							case 'Invalid Password':
								r.push({
									field: 'password',
									message: "Sorry, that password isn't right.",
								});
								break;
							case 'Invalid captcha response':
								r.push({
									field: 'generic',
									message:
										'Sorry, we could not sign you in as the captcha validation failed.',
								});
								break;
							case 'Login attempts over':
								r.push({
									field: 'generic',
									message:
										'The maximum number of login attempts has been reached. Please try again in an hour.',
								});
						}
						throw (
							(0 === r.length &&
								(a.captureException(t.error),
								r.push({
									field: 'generic',
									message: 'Sorry, we could not sign you in at the moment.',
								})),
							r)
						);
					});
			},
			register: function (e, t, n, o) {
				return r
					.post(r._PREFIX + 'users', {
						email: t,
						password: n,
						username: e,
						mailing_lists_opt_in: o,
					})
					.then(function (e) {
						var t, n, r, o, i;
						if (!(null == e ? void 0 : e.error))
							return {
								username: e.username,
								uuid: e.uuid,
								roles: e.roles,
								accessToken: e.access_token,
								refreshToken: e.refresh_token,
							};
						var s = [];
						if (
							'The server received a request that could not be processed.' ===
							(null === (t = e.error) || void 0 === t ? void 0 : t.message)
						) {
							var l =
								null === (n = e.error) || void 0 === n ? void 0 : n.source;
							if (null == l ? void 0 : l.email)
								switch (
									null === (r = l.email) || void 0 === r ? void 0 : r.msg
								) {
									case 'email already in use':
										s.push({
											field: 'email',
											message:
												'Someone (maybe you?) has already created an account using this email.',
										});
										break;
									case 'must be an email':
										s.push({
											field: 'email',
											message:
												"This doesn't appear to be a valid email address. Please try a different email address.",
										});
								}
							if (null == l ? void 0 : l.username)
								switch (
									null === (o = l.username) || void 0 === o ? void 0 : o.msg
								) {
									case 'username not available':
										s.push({
											field: 'username',
											message:
												'Another user with this username already exists. Please try a different username.',
										});
										break;
									case 'invalid username':
										s.push({
											field: 'username',
											message:
												'Username must be minimum 2 characters long, and should not contain spaces or special characters.',
										});
								}
							if (null == l ? void 0 : l.password)
								switch (
									null === (i = l.password) || void 0 === i ? void 0 : i.msg
								) {
									case 'password must be atleast 8 characters long':
										s.push({
											field: 'password',
											message: 'Password must be minimum 8 characters long.',
										});
								}
						}
						throw (
							(0 === s.length &&
								(a.captureException(e.error),
								s.push({
									field: 'generic',
									message:
										'Sorry, we could not create your account at the moment.',
								})),
							s)
						);
					});
			},
			apply: function (e, t, o) {
				var i = 'users/' + e + '/hackathon/' + t + '/apply';
				return r
					.post(r._PREFIX + i, {}, n(n({}, r._HEADERS), { access_token: o }))
					.then(function (e) {
						var t;
						if (!(null == e ? void 0 : e.error)) return e;
						var n = {
							field: 'generic',
							message: 'Unable to apply to this hackathon.',
						};
						switch (
							null === (t = e.error) || void 0 === t ? void 0 : t.message
						) {
							case "Can't apply, hackathon registrations are not open.":
								n.message = 'Sorry, the hackathon registrations are not open.';
								break;
							case "Can't apply, hackathon registration are close.":
								n.message =
									'Sorry, this hackathon is no longer accepting new registrations.';
								break;
							default:
								a.captureException(e.error);
						}
						throw n;
					});
			},
			getOrganizedHackathons: function (e, t) {
				return r
					.get(
						r._PREFIX + 'users/' + e + '/my_organized_hackathons',
						n(n({}, r._HEADERS), { access_token: t })
					)
					.then(function (e) {
						if (!(null == e ? void 0 : e.error)) return { data: e };
						throw (a.captureException(e.error), e.error);
					});
			},
			captureException: function (e) {
				var t;
				null ===
					(t = null === window || void 0 === window ? void 0 : window.Sentry) ||
					void 0 === t ||
					t.captureException(e);
			},
		},
		r = {
			_PREFIX: 'https://api.devfolio.co/api/',
			_HEADERS: { 'Content-Type': 'application/json; charset=utf-8' },
			get: function (e, t) {
				return (
					void 0 === e && (e = ''),
					fetch(e, {
						method: 'GET',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: t || r._HEADERS,
						referrer: 'no-referrer',
					})
						.then(function (e) {
							return e.json();
						})
						.catch(function (e) {
							throw e;
						})
				);
			},
			post: function (e, t, n) {
				return (
					void 0 === e && (e = ''),
					void 0 === t && (t = {}),
					fetch(e, {
						method: 'POST',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: n || r._HEADERS,
						referrer: 'no-referrer',
						body: JSON.stringify(t),
					})
						.then(function (e) {
							var t = e.headers.get('content-type');
							return t && t.includes('application/json') ? e.json() : e;
						})
						.catch(function (e) {
							throw e;
						})
				);
			},
		},
		o = { padding: 0, border: 0, margin: 0, height: '44px', width: '312px' },
		i = {
			position: 'fixed',
			left: 0,
			top: 0,
			display: 'none',
			width: '100%',
			height: '100%',
			zIndex: 2147483647,
		},
		s = {
			position: 'relative',
			height: '100%',
			width: '100%',
			display: 'block',
			backgroundColor: 'transparent',
			padding: 0,
			border: 0,
			margin: 0,
		},
		l = {
			_CLASSNAME: 'devfolio-button-iframe',
			_SANDBOX:
				'allow-scripts allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation',
			loadedFrameIds: [],
			createFrame: function (e, t) {
				var n = document.createElement('iframe');
				return (
					(n.src =
						'https://apply.devfolio.co/v2/button?' +
						new URLSearchParams(t).toString()),
					(n.title = 'Apply with Devfolio'),
					(n.className = l._CLASSNAME),
					Object.assign(n.style, o),
					n.setAttribute('sandbox', l._SANDBOX),
					n.addEventListener('load', function () {
						l.loadedFrameIds.push(e);
					}),
					n
				);
			},
			allFrames: function () {
				return document.querySelectorAll('.' + l._CLASSNAME);
			},
			postMessage: function (e, t) {
				l.allFrames().forEach(function (n, a) {
					function r() {
						n.contentWindow.postMessage({ type: e, payload: t }, '*');
					}
					l.loadedFrameIds.includes(a) ? r() : n.addEventListener('load', r);
				});
			},
		},
		c = {
			_ID: 'devfolio-overlay-iframe',
			_CONTAINER_ID: 'devfolio-overlay-container',
			_SANDBOX:
				'allow-scripts allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation allow-forms allow-popups',
			hasLoaded: !1,
			createFrame: function () {
				var e = document.createElement('iframe');
				(e.src =
					'https://apply.devfolio.co/v2/overlay' + window.location.search),
					(e.title = 'Continue your hackathon application'),
					(e.id = c._ID),
					Object.assign(e.style, s),
					e.setAttribute('sandbox', c._SANDBOX),
					e.addEventListener('load', function () {
						c.hasLoaded = !0;
					});
				var t = document.createElement('div');
				return (
					(t.id = c._CONTAINER_ID),
					Object.assign(t.style, i),
					t.appendChild(e),
					t
				);
			},
			frame: function () {
				return document.querySelector('#' + c._ID);
			},
			container: function () {
				return document.querySelector('#' + c._CONTAINER_ID);
			},
			postMessage: function (e, t) {
				var n = c.frame();
				function a() {
					n.contentWindow.postMessage({ type: e, payload: t }, '*');
				}
				c.hasLoaded ? a() : n.addEventListener('load', a);
			},
		};
	if (
		'https:' !== window.location.protocol &&
		!(function () {
			var e = window.location.hostname.split('.');
			return 'localhost' === e[e.length - 1];
		})()
	)
		throw new Error(
			'Could not initialize the Apply Now script over a non-secure connection.'
		);
	function u() {
		return document.querySelectorAll('.apply-button');
	}
	window.addEventListener('message', function (e) {
		var t = e.isTrusted,
			n = e.data;
		if (t && (null == n ? void 0 : n.type)) {
			var a = c.container();
			switch (n.type) {
				case 'OPEN_OVERLAY':
					a.style.display = 'block';
					break;
				case 'CLOSE_OVERLAY':
					a.style.display = 'none';
					break;
				default:
					console.log('(SDK) Received unexpected message.', e);
			}
		}
	}),
		(function () {
			e(this, void 0, void 0, function () {
				var e, n, r;
				return t(this, function (t) {
					switch (t.label) {
						case 0:
							return (
								t.trys.push([0, 3, , 4]),
								[
									4,
									new Promise(function (e, t) {
										var n = u();
										if (n.length > 0) {
											var a = n[0].getAttribute('data-hackathon-slug');
											'string' == typeof a && a.length > 0 && e(a);
										}
										t(
											"Could not find an element with the class name 'apply-button' that has a data-hackathon-slug attribute."
										);
									}),
								]
							);
						case 1:
							return (
								(e = t.sent()),
								u().forEach(function (e, t) {
									var n;
									null === (n = null == e ? void 0 : e.parentNode) ||
										void 0 === n ||
										n.replaceChild(l.createFrame(t, e.dataset), e);
								}),
								(o = {
									'ethindia-2022--no-shadow': '60px',
									'ethindia-2022--light-shadow': '64px',
									'ethindia-2022--dark-shadow': '64px',
								}),
								document
									.querySelectorAll('.devfolio-button-iframe')
									.forEach(function (e) {
										var t = e.getAttribute('src');
										if (null !== t) {
											var n = new URL(t),
												a = n.searchParams.get('buttonWidth'),
												r = n.searchParams.get('buttonTheme');
											null != r &&
												Object.keys(o).includes(r) &&
												(e.style.height = o[r]),
												a && (e.style.width = a + 'px');
										}
									}),
								document.body.appendChild(c.createFrame()),
								[4, a.getHackathonData(e)]
							);
						case 2:
							return (
								(n = t.sent()),
								l.postMessage('SEND_HACKATHON_DATA', n),
								c.postMessage('SEND_HACKATHON_DATA', n),
								[3, 4]
							);
						case 3:
							return (
								'Failed to fetch' ===
								(null == (r = t.sent()) ? void 0 : r.message)
									? l.postMessage('ENABLE_DEV_MODE')
									: console.log('(SDK)', r),
								[3, 4]
							);
						case 4:
							return [2];
					}
					var o;
				});
			});
		})();
})();
//# sourceMappingURL=sdk.js.map
