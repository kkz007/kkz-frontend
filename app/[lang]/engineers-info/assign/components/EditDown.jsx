import { Combobox, Transition } from '@headlessui/react'
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

export default function EditDropDown(props) {
    const [query, setQuery] = useState('')
    const filteredPeople =
        query === ''
            ? props?.people
            : props?.people.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, '')),
              )

    return (
        <div className="w-full text-xs">
            <Combobox
                disabled={props?.disabled}
                value={props?.selected}
                onChange={props?.handleChange}
            >
                <div className="relative mt-1">
                    <div className="relative h-[35px] w-full cursor-pointer overflow-hidden rounded-md border border-slate-300 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
                        <Combobox.Input
                            className="h-[35px] w-full py-2 pl-2 pr-10 leading-5 text-gray-900 outline-none"
                            displayValue={(person) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />

                        <Combobox.Button
                            className="absolute inset-y-0 right-0 flex items-center pr-2"
                            onClick={() => props?.setUpIcon(true)}
                        >
                            {props?.upIcon ? (
                                <ChevronUpIcon
                                    className="h-4 w-4 text-gray-500"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    className="h-4 w-4 text-gray-500"
                                    aria-hidden="true"
                                />
                            )}
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => {
                            setQuery('')
                            props?.setUpIcon(false)
                        }}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {filteredPeople?.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople?.map((person, index) => (
                                    <Combobox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-6 pr-4 ${
                                                active
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-1 ${
                                                            active
                                                                ? 'text-white'
                                                                : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
