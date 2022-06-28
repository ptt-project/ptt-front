import ALink from '~/components/features/custom-link'
import React, { FC } from 'react'
import t from '~/locales'
import styles from './SideBarSettingMenu.module.scss'

const SideBarSettingMenu: FC = () => {
    const toggleSidebar = () => {
        document.querySelector( 'body' ).classList.toggle( 'sidebar-active' );
    }
    const hideSidebar = () => {
        document.querySelector( 'body' ).classList.remove( 'sidebar-active' );
    }
   
    return ( 
        <aside className="col-xl-3 col-lg-4 sidebar sidebar-fixed sticky-sidebar-wrapper home-sidebar">
            <div className="sidebar-overlay" onClick={ hideSidebar }>
                <ALink className="sidebar-close" href="#"><i className="d-icon-times"></i></ALink>
            </div>
            <ALink href="#" className="sidebar-toggle" onClick={ toggleSidebar }><i className="fas fa-chevron-right"></i></ALink>
            <div className={`sidebar-content ${styles.widthMenu}`}>
            <div className="sticky-sidebar ">
                <h6 class='widget-title'><i className={`fas fa-user ${styles.paddingRight5}`}/>{t('SideBarSettingMenu.userAccount')}</h6>
                <ul className="widget-body ml-5" >
                    <li>{t('SideBarSettingMenu.personalInfo')}</li>
                    <li>{t('SideBarSettingMenu.address')}</li>
                    <li>{t('SideBarSettingMenu.changePassword')}</li>
                    <li>{t('SideBarSettingMenu.relationship')}</li>
                </ul>
                <h6 class='widget-title'><i className={`fas fa-wallet ${styles.paddingRight5}`}/>{t('SideBarSettingMenu.finance')}</h6>
                <ul className="widget-body ml-5">
                    <li>{t('SideBarSettingMenu.eWallet')}</li>
                    <li>{t('SideBarSettingMenu.bankAccount')}</li>
                    <li>{t('SideBarSettingMenu.happyPoint')}</li>
                </ul>
                <h6 class='widget-title'><i className={`fas fa-ticket-alt ${styles.paddingRight5}`}/>{t('SideBarSettingMenu.discountCode')}</h6>
                <h6 class='widget-title'><i className={`fas fa-shopping-cart ${styles.paddingRight5}`}/>{t('SideBarSettingMenu.myPurchase')}</h6>
                <h6 class='widget-title'><i className={`fas fa-bell ${styles.paddingRight5}`}/>{t('SideBarSettingMenu.notification')}</h6>
            </div>
            </div>
        </aside>
    )
}
export default SideBarSettingMenu