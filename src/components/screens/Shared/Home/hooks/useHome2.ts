import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Logger, useCopy } from '@services';
import { filterArrayByKeys } from '@utils/functions';
import { ApplicationScreenProps, Article } from '@types';
import { useTodos, useArticles } from '@hooks';
import { storage } from '@redux/store';

export const useHome = () => {
    const navigation: ApplicationScreenProps = useNavigation();
    const { getCopyValue } = useCopy();
    const { data, deletedArticlesItems, isLoading } = useArticles();
    // const { data } = useTodos();

    // const todoList = useMemo(() => {
    //     // console.log('todoList', { data: data?.length, todos: todos.length });

    //     return data || todos
    // }, [data]);

    const todayDate = useMemo(() => format(new Date(), 'cccc, LLLL do'), []);

    useEffect(() => {
        const keys = storage.getAllKeys();
        console.log('ewe', { data: data?.hits?.length, f: data?.hits[0].story_title });
        // Logger.log('ewe', { data: data?.length });

        // const mitodo = getTodo(101);
        // console.log('ewe', { todo: todo });

        // addTodo({
        //     userId: 1,
        //     title: 'Eric T. Todo',
        //     completed: false
        // })
    }, [data]);

    const articlesData = useMemo(() => {
        let articleList: Article[] = [];
        let highlightedArticle: Article | null = null;
        if (data?.hits) {
            const filteredArticles = filterArrayByKeys(
                data?.hits,
                deletedArticlesItems,
                ['objectID'],
            );
            highlightedArticle = filteredArticles[0] || null;
            articleList = filteredArticles.slice(1);
        }
        return {
            articles: articleList,
            highlightedArticle,
        };
    }, [data, deletedArticlesItems]);

    return {
        articlesData,
        loading: isLoading,
        todayDate
    }
};