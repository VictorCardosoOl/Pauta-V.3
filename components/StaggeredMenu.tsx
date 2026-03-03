
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { Home, ArrowRight } from 'lucide-react'; // Importando ícones
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  id: string;
  ariaLabel?: string;
  link?: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items: StaggeredMenuItem[];
  socialItems?: { label: string; link: string }[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string; 
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  // Integration props
  activeId?: string;
  onSelectItem?: (id: string) => void;
  onGoHome?: () => void; // Nova prop para ação de Home
}

export interface StaggeredMenuHandle {
  toggle: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const StaggeredMenu = forwardRef<StaggeredMenuHandle, StaggeredMenuProps>(({
  position = 'left',
  colors = ['#F5F5F7', '#E5E5E5'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#1C1C1E',
  openMenuButtonColor = '#1C1C1E',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  activeId,
  onSelectItem,
  onGoHome
}, ref) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<Element[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);
  
  const busyRef = useRef(false);

  // --- GSAP SETUP ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      
      if (!panel || !plusH || !plusV || !icon) return;

      let preLayers: Element[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      // Initial States
      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // --- ANIMATION BUILDERS ---
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const homeBtn = panel.querySelector('.sm-home-btn'); // Novo elemento
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    // Reset elements for animation
    if (homeBtn) gsap.set(homeBtn, { y: 20, opacity: 0 });
    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 120, rotate: 5 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    // Staggered Layers
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.6, ease: 'power3.inOut' }, i * 0.05);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.05 : 0;
    const panelInsertTime = lastTime + 0.1;
    const panelDuration = 0.7;

    // Panel Entrance
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power3.inOut' },
      panelInsertTime
    );

    const contentStart = panelInsertTime + 0.3;

    // 1. Items Entrance (FIRST NOW)
    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.06, from: 'start' }
        },
        contentStart // Start immediately when panel opens
      );
      
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.06, from: 'start' }
          },
          contentStart + 0.1
        );
      }
    }

    // 2. Home Button Entrance (BOTTOM - SECOND)
    if (homeBtn) {
       tl.to(homeBtn, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, contentStart + 0.2);
    }

    // 3. Socials Entrance (LAST)
    if (socialTitle || socialLinks.length) {
      const socialsStart = contentStart + 0.3;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.06, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.05
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.5,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        // Reset styles on close to clean state
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 5 });
        
        const homeBtn = panel.querySelector('.sm-home-btn');
        if (homeBtn) gsap.set(homeBtn, { y: 20, opacity: 0 });

        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  // --- ACTIONS ---
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  const openMenu = useCallback(() => {
    if (!openRef.current) {
      openRef.current = true;
      setOpen(true);
      onMenuOpen?.();
      playOpen();
      animateIcon(true);
      animateColor(true);
    }
  }, [playOpen, animateIcon, animateColor, onMenuOpen]);

  useImperativeHandle(ref, () => ({
    toggle: toggleMenu,
    open: openMenu,
    close: closeMenu,
    isOpen: open
  }));

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  // Handle Escape Key and Focus Trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'Escape') {
        closeMenu();
      }

      if (e.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;

        const focusableElements = panel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closeMenu]);

  // Focus first item on open
  useEffect(() => {
    if (open && panelRef.current) {
      // Wait for animation to start/elements to be visible
      const timer = setTimeout(() => {
        const firstItem = panelRef.current?.querySelector('button, a') as HTMLElement;
        firstItem?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleItemClick = (id: string) => {
    if (onSelectItem) onSelectItem(id);
    closeMenu();
  };

  const handleGoHome = () => {
    if (onGoHome) onGoHome();
    closeMenu();
  };

  return (
    <div
      className={`${className || ''} staggered-menu-wrapper ${isFixed ? 'fixed-wrapper' : ''}`}
      style={accentColor ? { ['--sm-accent' as string]: accentColor } as React.CSSProperties : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#f5f5f7', '#e5e5ea'];
          return raw.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation header">
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          
          {/* 1. LISTA DE ITENS AGORA NO TOPO */}
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.filter(it => it.id !== 'all').map((it, idx) => ( 
                <li className="sm-panel-itemWrap" key={it.id + idx}>
                  <button 
                    className="sm-panel-item" 
                    onClick={() => handleItemClick(it.id)}
                    aria-label={it.ariaLabel || it.label} 
                    data-index={idx + 1}
                    data-active={activeId === it.id}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">Sem itens</span>
                </span>
              </li>
            )}
          </ul>

          {/* 2. RODAPÉ (DIVIDER, HOME, SOCIALS) - Push to bottom */}
          <div className="sm-panel-footer">
              <div className="sm-divider" />
              
              <div className="sm-home-wrapper">
                 <button onClick={handleGoHome} className="sm-home-btn group">
                    <span className="sm-home-icon-box">
                        <Home size={20} strokeWidth={1.5} />
                    </span>
                    <span className="sm-home-text">Início / Dashboard</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-auto" />
                 </button>
              </div>

              {displaySocials && socialItems && socialItems.length > 0 && (
                 <div className="sm-socials" aria-label="Social links">
                     <>
                       <h3 className="sm-socials-title">Links Úteis</h3>
                       <ul className="sm-socials-list" role="list">
                         {socialItems.map((s, i) => (
                           <li key={s.label + i} className="sm-socials-item">
                             <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                               {s.label}
                             </a>
                           </li>
                         ))}
                       </ul>
                     </>
               </div>
              )}
          </div>

        </div>
      </aside>
    </div>
  );
});
