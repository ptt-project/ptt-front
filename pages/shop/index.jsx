import React from 'react';
import { Helmet } from 'react-helmet';

import ALink from '~/components/features/custom-link';

import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';

function ShopBoxedBanner() {
    return (
        <main className="main">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Boxed Banner Page</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Boxed Banner Page</h1>

            <div className="page-content mb-10 pb-2">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Shop</li>
                    </ul>

                    <div className="row main-content-wrap gutter-lg">
                        <SidebarFilterOne type="boxed" />

                        <div className="col-lg-9">
                            <div className="shop-banner banner"
                                style={ { backgroundImage: `url(./images/home/shop_banner.jpg)`, backgroundColor: "#f2f2f3" } }>
                                <div className="banner-content">
                                    <h4
                                        className="banner-subtitle mb-2 d-inline-block text-uppercase font-weight-bold text-white bg-dark">
                                        Through Thursday</h4>
                                    <h1 className="banner-title text-uppercase text-dark font-weight-bold ls-l">20% off
										Suede Bags</h1>
                                    <ALink href="#" className="btn btn-outline btn-rounded btn-dark">Shop now</ALink>
                                </div>
                            </div>

                            <ProductListOne type="boxed" />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default React.memo( ShopBoxedBanner );