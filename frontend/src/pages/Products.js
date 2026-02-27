import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 350);
        return () => clearTimeout(t);
    }, [searchInput]);

    useEffect(() => {
        getCategories()
            .then(r => setCategories(r.data.categories))
            .catch(() => {});
    }, []);

    const fetchProducts = useCallback(async() => {
        setLoading(true);
        try {
            const params = {};
            if (category !== 'All') params.category = category;
            if (search) params.search = search;
            if (sort) params.sort = sort;
            const { data } = await getProducts(params);
            setProducts(data.products);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [category, search, sort]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return React.createElement(
        'div', { className: 'products-page page-enter' },
        React.createElement(
            'div', { className: 'products-header' },
            React.createElement(
                'div', { className: 'container' },
                React.createElement(
                    motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },
                    React.createElement('h1', { className: 'products-title' }, 'The Collection'),
                    React.createElement('p', { className: 'products-subtitle' }, `${products.length} items available`)
                )
            )
        ),
        React.createElement(
            'div', { className: 'container products-layout' },
            React.createElement(
                motion.aside, {
                    className: 'filters-sidebar',
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { duration: 0.5, delay: 0.1 }
                },
                React.createElement(
                    'div', { className: 'filter-section' },
                    React.createElement('h3', { className: 'filter-label' }, 'Search'),
                    React.createElement(
                        'div', { className: 'search-wrap' },
                        React.createElement(
                            'svg', {
                                className: 'search-icon',
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2'
                            },
                            React.createElement('circle', { cx: '11', cy: '11', r: '8' }),
                            React.createElement('path', { d: 'm21 21-4.35-4.35' })
                        ),
                        React.createElement('input', {
                            className: 'form-input search-input',
                            type: 'text',
                            placeholder: 'Search products...',
                            value: searchInput,
                            onChange: e => setSearchInput(e.target.value)
                        }),
                        searchInput &&
                        React.createElement(
                            'button', { className: 'search-clear', onClick: () => setSearchInput('') },
                            '×'
                        )
                    )
                ),
                React.createElement(
                    'div', { className: 'filter-section' },
                    React.createElement('h3', { className: 'filter-label' }, 'Category'),
                    React.createElement(
                        'div', { className: 'category-list' },
                        categories.map(cat =>
                            React.createElement(
                                'button', {
                                    key: cat,
                                    className: `cat-btn ${category === cat ? 'active' : ''}`,
                                    onClick: () => setCategory(cat)
                                },
                                cat
                            )
                        )
                    )
                ),
                React.createElement(
                    'div', { className: 'filter-section' },
                    React.createElement('h3', { className: 'filter-label' }, 'Sort By'),
                    React.createElement(
                        'select', {
                            className: 'form-input sort-select',
                            value: sort,
                            onChange: e => setSort(e.target.value)
                        },
                        React.createElement('option', { value: '' }, 'Default'),
                        React.createElement('option', { value: 'price-asc' }, 'Price: Low to High'),
                        React.createElement('option', { value: 'price-desc' }, 'Price: High to Low'),
                        React.createElement('option', { value: 'rating' }, 'Top Rated')
                    )
                ),
                (category !== 'All' || search || sort) &&
                React.createElement(
                    'button', {
                        className: 'btn btn-outline clear-filters',
                        onClick: () => {
                            setCategory('All');
                            setSearchInput('');
                            setSort('');
                        }
                    },
                    'Clear Filters'
                )
            ),
            React.createElement(
                'main', { className: 'products-main' },
                React.createElement(
                    AnimatePresence, { mode: 'wait' },
                    loading ?
                    React.createElement(
                        motion.div, { key: 'loading', className: 'loading-grid', initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
                        Array.from({ length: 8 }).map((_, i) =>
                            React.createElement(
                                'div', { key: i, className: 'skeleton-card' },
                                React.createElement('div', { className: 'skeleton-img' }),
                                React.createElement(
                                    'div', { className: 'skeleton-body' },
                                    React.createElement('div', { className: 'skeleton-line' }),
                                    React.createElement('div', { className: 'skeleton-line short' }),
                                    React.createElement('div', { className: 'skeleton-line shorter' })
                                )
                            )
                        )
                    ) :
                    products.length === 0 ?
                    React.createElement(
                        motion.div, { key: 'empty', className: 'empty-state', initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                        React.createElement('div', { className: 'empty-icon' }, '🔍'),
                        React.createElement('h3', null, 'No products found'),
                        React.createElement('p', null, 'Try adjusting your filters or search terms.')
                    ) :
                    React.createElement(
                        motion.div, { key: 'grid', className: 'products-grid' },
                        products.map((p, i) =>
                            React.createElement(ProductCard, { key: p.id, product: p, index: i })
                        )
                    )
                )
            )
        )
    );
}