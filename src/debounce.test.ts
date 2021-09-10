import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce()', () => {
    it('should return a function', () => {
        const debounced = debounce(() => {}, 1000);
        expect(typeof debounced).toEqual('function');
    });

    it('should return a function that has the same syntax of the original', () => {
        const original = jest.fn((a: number, b: number) => 0);
        const debounced = debounce(original, 1000);
        expect(original).not.toBeCalled();
        debounced(3, 4);
        expect(original).not.toBeCalled();
        jest.runAllTimers();
        expect(original).toBeCalledWith(3, 4);
    });

    it('should reset the timer if the returned function is run a second time with in the delay', () => {
        const original = jest.fn();
        const debounced = debounce(original, 1000);
        expect(original).not.toBeCalled();
        debounced(3, 4);
        expect(original).not.toBeCalled();
        jest.advanceTimersByTime(600);
        expect(original).not.toBeCalled();
        debounced(3, 4);
        expect(original).not.toBeCalled();
        jest.advanceTimersByTime(600);
        expect(original).not.toBeCalled();
        jest.advanceTimersByTime(600);
        expect(original).toBeCalled();
    });
});
